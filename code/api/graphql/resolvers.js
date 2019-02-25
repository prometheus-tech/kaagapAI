const Sequelize = require('sequelize');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const GraphQlJSON = require('graphql-type-json');
const models = require('../models');
const Op = Sequelize.Op;
const operatorsAliases = {
  $ne: Op.ne
}

const resolver = { 
  JSON: GraphQlJSON,
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
  getClients: ({ p_id }) => models.Practitioner.findOne({
    raw: true,
    where: {
      p_id,
      $ne: [{
        session_token: null
      }]
    },
    attributes: ['p_id', 'session_token']
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
    res => models.Client.findAll({
      raw: true,
      limit: 1,
      where: {
        fname,
        lname,
        p_id
      },
      attributes:['c_id', 'fname'],
      order: [[ 'c_id', 'DESC']]
    }) //Returns only the id and name of added client
  ),

  removeClient: ({ c_id }) =>        models.Client.findAll({
    raw: true, 
    where: {c_id},
    attributes:['c_id', 'fname']
  }).then(
    res => {
      models.Client.destroy({
        where: { c_id }
      })
      return res; //Returns only the id and name of removed client
    }
  ),
}

module.exports = resolver;