import GraphQlUUID from 'graphql-type-uuid';
import GraphQlJSON from 'graphql-type-json';
import auth from '../../modules/auth';

export default {
  UUID: GraphQlUUID,
  JSON: GraphQlJSON,

  Query: {},

  Mutation: {
    login: async (parent, { email, password }, { models, SECRET }) => {
      const practitioner = await models.Practitioner.findOne({
        raw: true,
        where: {
          email,
          status: 'active'
        }
      })
      .then(practitioner => {
        if (!auth.validateEmail(practitioner)) {
          throw new Error('Email is not yet registered');
        } else {
          return practitioner;
        }
      })
      .then(practitioner => {
        if (!auth.validatePassword({ password, practitioner })) {
          throw new Error('Invalid password. Try again');
        } else {
          return practitioner;
        }
      })
      
      const session_token = auth.generateToken(practitioner, SECRET);

      return { p_id: practitioner.p_id, session_token };
    }
  }
};
