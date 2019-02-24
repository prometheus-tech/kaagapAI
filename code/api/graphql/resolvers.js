const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolver = { 
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      
      return null;
    }
  }),

  Query: {
    getClients: () => {
      return "Hello"
    }
  },

  Mutation: {
    addClient: (parent, args, { models }) => models.Client.create(args),
    // removeClient: (parent, { c_id }, {models}) => models.Client.destroy({where: { c_id }})
  }
}

module.exports = resolver;