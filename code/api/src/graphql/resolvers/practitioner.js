import GraphQlUUID from 'graphql-type-uuid';

export default {
  UUID: GraphQlUUID, 

  Query: { 
  },

  Mutation: { 
    login: async (parent, { email, password }, { models }) => {
    }
  }
};
