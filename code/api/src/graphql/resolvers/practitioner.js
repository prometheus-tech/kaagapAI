import GraphQlUUID from 'graphql-type-uuid';
import GraphQlJSON from 'graphql-type-json';
import Sequelize from 'sequelize';
import auth from '../../modules/auth';
import registration from '../../modules/registration';
import { AuthenticationError, ApolloError, ForbiddenError } from 'apollo-server-express';
import uuid from 'uuid/v4';

export default {
  UUID: GraphQlUUID,
  JSON: GraphQlJSON,

  Archives: {

  }, 

  Query: {
    profile: async (parent, args, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return await models.Practitioner.findOne({
          raw: true,
          where: { p_id: practitioner },
          attributes: { 
            exclude: [
              'date_deactivated',
              'verification_code',
              'user_status',
              'p_id',
            ]
          }
        });
      }
    },

    archives: async (parent, args, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const Op = Sequelize.Op;

        var clientArchives = [];
        var sessionArchives = [];

        const clientsActive = await models.Client.findAll({
          raw: true,
          where: { p_id: practitioner }
        }).then(async clients => {
          var clientActive = [];
          clients.forEach(client => {
            if(client.status == 'archived'){
              clientArchives.push(client);
            } else {
              clientActive.push(client.c_id);
            }
          });
          return clientActive;
        });

        const sessionsActive = await models.Session.findAll({
          raw: true,
          where: {
            c_id: {
              [Op.in]: clientsActive
            }
          }
        }).then(async sessions => {
          var sessionActive = [];
          sessions.forEach(session => {
            if(session.status == 'archived'){
              sessionArchives.push(session);
            } else {
              sessionActive.push(session.session_id);
            }
          });
          return sessionActive;
        });
        
        const sessionDocumentsArchives = await models.Session_Document.findAll({
          raw: true,
          where: {
            session_id: {
              [Op.in]: sessionsActive,
            },
            status: 'archived'
          }
        });

        return {
          archives_id: uuid(),
          clients: clientArchives, 
          sessions: sessionArchives,
          session_documents: sessionDocumentsArchives
        };
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
          const { errorMessage, errorCode} = auth.verifyPractitioner(practitioner);
          if (!errorMessage) {
            return practitioner;
          } else {
            throw new ApolloError(errorMessage, errorCode);
          }
        })
        .then(practitioner => {
          if (!auth.validateEmail(practitioner)) {
            throw new ApolloError('Email is not yet registered', 'EMAIL_UNREGISTERED');
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
            throw new ApolloError('Invalid password', 'INVALID_PASSWORD');
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
      } else if (existingPractitioner.user_status == 'active') {
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
            throw new ApolloError('Invalid Verification Code', 'INVALID_VERIFICATION_CODE');
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
              attributes: { 
                exclude: [
                  'date_deactivated',
                  'verification_code',
                  'user_status',
                  'p_id',
                ]
              }
            })
          })
        }
      }
    },

    forgotPassword: async (parent, { email }, { models }) => {
      const changePasswordUUID = uuid();
      //change body base on final url
      var body =
        'To change your password please click on the link: http://kaagapai-dev.com:3000/change-password/'+changePasswordUUID;
      const subject = 'Change Account Password';

      return models.Practitioner.findOne({
        raw: true,
        where: { 
          email,
          user_status: 'active'
        },
        attributes: [ 'email' ]
      }).then(async res => {
        if(!res) {
          //throw error that email is not registered
          throw new ApolloError('Email is not yet registered', 'EMAIL_UNREGISTERED');
        } else {
          if (await registration.sendEmail(subject, body, email)) {
            await models.Practitioner.update({
              change_password_UUID: changePasswordUUID
            }, {
              where: { email }
            });
  
            return await models.Practitioner.findOne({
              raw: true,
              where: { 
                email,
                user_status: 'active'
              },
              attributes: [ 'email' ]
            });
          }
        }
      })
    },

    changePassword: async ( parent, { changePasswordToken, password }, { models } ) => {
      return await models.Practitioner.findOne({
        raw: true,
        where: { change_password_UUID: changePasswordToken }
      }).then(async res => {
        if (res) {
          const hashPassword = await registration.hashPassword(password);

          //link to be changed
          var body =
            'Your account password has been successfully changed. Please click the link to login: kaagapai-dev.com/login';
          const subject = 'Password Successfully Changed';

          await models.Practitioner.update({
            password: hashPassword,
            change_password_UUID: null
          }, { 
            where: { change_password_UUID: changePasswordToken } 
          }).then(async res => await registration.sendEmail(subject, body, res.email));

          return res.email;
        } else {
          throw new ForbiddenError('Invalid change password token');
        }
      })
    }
  }
};
