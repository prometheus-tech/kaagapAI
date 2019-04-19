import GraphQlUUID from 'graphql-type-uuid';
import GraphQlJSON from 'graphql-type-json';
import auth from '../../modules/auth';
import registration from '../../modules/registration';
import { AuthenticationError, ApolloError } from 'apollo-server-express';

export default {
  UUID: GraphQlUUID,
  JSON: GraphQlJSON,

  Query: {},

  Mutation: {
    login: async (parent, { email, password }, { models, SECRET }) => {
      const practitioner = await models.Practitioner.findOne({
        raw: true,
        where: { email }
      })
      .then(practitioner => {
        const errorMessage = auth.verifyPractitioner(practitioner);
        if(!errorMessage){
          return practitioner;
        } else {
          throw new AuthenticationError(errorMessage);
        }
      })
      .then(practitioner => {
        if (!auth.validateEmail(practitioner)) {
          throw new AuthenticationError('Email is not yet registered');
        } else {
          return practitioner;
        }
      })
      .then(async practitioner => {
        const validPassword = await auth.validatePassword({ password, practitioner });
        
        if (!validPassword) {
          throw new AuthenticationError('Invalid password');
        } else {
          return practitioner;
        }
      })
      
      const session_token = auth.generateToken(practitioner, SECRET);

      return { session_token };
    },

    register: async (parent, { email, password, phone_no, fname, lname, license, profession }, { models }) => {
      const existingPractitioner = await models.Practitioner.findOne({
        raw: true,
        where: {
          email
        }
      });

      if(existingPractitioner){
        throw new ApolloError('Email is already in use', 'USER_ALREADY_EXISTS');
      } else {
        const verificationCode = registration.generateCode().toString();
        const body = 'To verify your email, please enter the following verification code: ' + verificationCode;
        const subject = 'Email verification';
        const hashPassword = await registration.hashPassword(password);

        if(await registration.sendEmail(subject, body, email)) {
          const addRegistration = await models.Practitioner.create({
            email,
            phone_no,
            password: hashPassword,
            fname,
            lname,
            license,
            profession,
            date_registered: new Date(),
            verification_code: verificationCode
          });

          const { p_id } = addRegistration.dataValues;

          return await models.Practitioner.findOne({
            raw: true,
            where: { p_id }
          });
        }
      }
    },

    verifyRegistration: async (parent, {
      email,
      input_code
    }, { models }) => 
      models.Practitioner.findOne({
        raw: true,
        where: { email }
      })
      .then(res => {
        const verificationCode = res.verification_code;

        return registration.verifyCode(input_code, verificationCode);
      })
      .then(async res => {
        if (res) {
          await models.Practitioner.update({
            verification_code: "verified"
          }, {
            where: { email }
          });

          const body = "Your account has been successfully verified! We will get back to you on your account's status.";
          const subject = "Assessing Account Status";
          await registration.sendEmail(subject, body, email);
  
          return models.Practitioner.findOne({
            raw: true,
            where: { email }
          });
        } else {
          throw new AuthenticationError('Invalid Verification Code')
        }
      })
  }
};