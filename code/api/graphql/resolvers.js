//sequelize operations (i.e findById, destroy, etc.) can be found here: https://sequelize.readthedocs.io/en/latest/api/model/
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = { 
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
    getClients: (parent, { p_id }, { models }) => models.Client.findAll({where: { p_id }})
  },

  Mutation: {
    addClient: (parent, args, { models }) => models.Client.create(args),
    // removeClient: (parent, { c_id }, {models}) => models.Client.destroy({where: { c_id }})
  }
}