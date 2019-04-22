import GraphQlUUID from 'graphql-type-uuid';
import GraphQlJSON from 'graphql-type-json';
import Sequelize from 'sequelize';
import auth from '../../modules/auth';
import registration from '../../modules/registration';
import { AuthenticationError, ApolloError } from 'apollo-server-express';

export default {
  UUID: GraphQlUUID,
  JSON: GraphQlJSON,

  Query: {
    profile: async (parent, args, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return await models.Practitioner.findOne({
          raw: true,
          where: { p_id: practitioner },
          attributes: [
            'email',
            'fname',
            'lname',
            'phone_no',
            'license',
            'profession',
            'date_registered',
            'last_logged'
          ]
        });
      }
    }
  },

  Mutation: {
    login: async (parent, { email, password }, { models, SECRET }) => {
      const practitioner = await models.Practitioner.findOne({
        raw: true,
        where: { email }
      })
        .then(practitioner => {
          const errorMessage = auth.verifyPractitioner(practitioner);
          if (!errorMessage) {
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
          const validPassword = await auth.validatePassword({
            password,
            practitioner
          });

          if (!validPassword) {
            throw new AuthenticationError('Invalid password');
          } else {
            return practitioner;
          }
        });

      await models.Practitioner.update({
          last_logged: new Date()
        }, {
          where: { p_id: practitioner.p_id }
        });

      const session_token = auth.generateToken(practitioner, SECRET);

      return { session_token };
    },

    register: async (
      parent,
      { email, password, phone_no, fname, lname, license, profession },
      { models }
    ) => {
      const existingPractitioner = await models.Practitioner.findOne({
        raw: true,
        where: { email }
      });

      var verificationCode = null;
      var body =
        'To verify your email, please enter the following verification code: ';
      const subject = 'Email verification';
      var hashPassword = null;

      if (!existingPractitioner) {
        verificationCode = registration.generateCode().toString();
        body = body + verificationCode;
        hashPassword = await registration.hashPassword(password);

        if (await registration.sendEmail(subject, body, email)) {
          await models.Practitioner.create({
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

          return { email };
        }
      } else if (existingPractitioner.verification_code == 'verified') {
        throw new ApolloError('Email is already in use', 'USER_ALREADY_EXISTS');
      } else {
        verificationCode = registration.generateCode().toString();
        body = body + verificationCode;
        hashPassword = await registration.hashPassword(password);

        if (await registration.sendEmail(subject, body, email)) {
          await models.Practitioner.update({
              phone_no,
              password: hashPassword,
              fname,
              lname,
              license,
              profession,
              verification_code: verificationCode
            }, { 
              where: { email } 
            });

          return { email };
        }
      }
    },

    verifyRegistration: async (parent, { email, input_code }, { models }) =>
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
              verification_code: 'verified',
              user_status: 'active'
            }, {
                where: { email }
            });

            const body =
              "Your account has been successfully verified! Please log in to continue";
            const subject = 'Account Verified';
            await registration.sendEmail(subject, body, email);

            return { email };
          } else {
            throw new AuthenticationError('Invalid Verification Code');
          }
        }),

    updateProfile: async (
      parent,
      { email, password, phone_no, fname, lname },
      { models, practitioner }
    ) => {
      const Op = Sequelize.Op;

      const existingPractitioner = await models.Practitioner.findOne({ 
        where: { 
          email,
          p_id: {
            [ Op.ne ]: practitioner
          }
        } 
      });

      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        if (existingPractitioner) {
          throw new ApolloError('Email is already in use', 'USER_ALREADY_EXISTS');
        } else {
          const hashPassword = await registration.hashPassword(password);

          return models.Practitioner.update({
            email,
            password: hashPassword,
            phone_no,
            fname,
            lname
          }, { 
            where: { p_id: practitioner } 
          }).then(async res => {
            return await models.Practitioner.findOne({
              raw: true,
              where: { p_id: practitioner },
              attributes: [
                'email',
                'fname',
                'lname',
                'phone_no',
                'license',
                'profession',
                'date_registered',
                'last_logged'
              ]
            })
          })
        }
      }
    }
  }
};
