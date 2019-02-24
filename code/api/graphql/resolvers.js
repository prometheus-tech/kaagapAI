const Sequelize = require('sequelize');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const models = require('../models');
const Op = Sequelize.Op;

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

  //Query
  getClients: ({ p_id }) => models.Client.findAll({
      where: { p_id },
      include: [
        model: models.Practitioner,
        where: {
          p_id,
          session_token: {
            [Op.ne]: null
          }
        }
      ]
  }),

  //Mutations
  addClient: ({ fname, lname, gender, birthdate, p_id }) => models.Client.create({
      fname, 
      lname, 
      gender, 
      birthdate, 
      p_id,
      date_added: new Date()
    }).then(
    res => "Successfully added client: " + res.fname + " " + res.lname
  ),

  // removeClient: (parent, { c_id }, {models}) => models.Client.destroy({where: { c_id }})
}

module.exports = resolver;