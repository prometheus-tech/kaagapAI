const Sequelize = require('sequelize');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const GraphQlJSON = require('graphql-type-json');
const models = require('../models');

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
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }

      return null;
    }
  }),

  //Query
  getClients: ({ p_id }) => models.Client.findAll({
    raw: true,
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('Sessions.session_id')), 'no_of_sessions']]
    },
    include:[{
      model: models.Session,
      attributes: [],
      required: false
    }],
    group: ['Client.c_id'],
    where: { p_id }
  }),

  //Mutations
  addClient: ({
    fname,
    lname,
    gender,
    birthdate,
    p_id
  }) => models.Client.create({
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
      attributes: ['c_id', 'fname', 'lname'],
      order: [
        ['c_id', 'DESC']
      ]
    }) //Returns only the id and name of added client
  ),

  removeClient: ({ c_id }) => models.Client.findOne({
    raw: true,
    where: { c_id },
    attributes: ['c_id', 'fname', 'lname']
  }).then(
    res => {
      models.Client.destroy({
        where: { c_id }
      })
      return res; //Returns only the id and name of removed client
    }
  ),

  //Update Client Name
  updateClientName: ({ c_id, fname, lname }) => models.Client.update({
    fname,
    lname,
  }, {
    where: { c_id },
    returning: false
  }).then(
    res => models.Client.findOne({
      raw: true,
      where: { c_id, fname, lname },
      attributes: ['c_id', 'fname', 'lname']
    }) //returns the fields updated
  ),

  //Update Client Birthdate
  updateClientBirthdate: ({ c_id, birthdate }) => models.Client.update({ birthdate }, {
    where: { c_id },
    returning: false
  }).then(
    res => models.Client.findOne({
      raw: true,
      where: { c_id, birthdate },
      attributes: ['c_id', 'birthdate']
    }) //returns the fields updated
  ),

  //Update last opened client
  updateClientLastOpened: ({ c_id }) => models.Client.update({ last_opened: new Date() }, {
    where: { c_id },
    returning: false
  }).then(
    res => models.Client.findOne({
      raw: true,
      where: { c_id },
      attributes: ['c_id', 'last_opened']
    })//returns the fields that can be updated
  ),

  getSessions: ({ c_id }) => models.Session.findAll({
    raw: true,
    where: { c_id }
  }),

  addSession: ({
    session_name,
    date_of_session,
    c_id
  }) => models.Session.create({
    session_name,
    date_of_session,
    c_id
  }).then(
    res => models.Session.findAll({
      raw: true,
      limit: 1,
      where: {
        c_id,
        session_name
      },
      attributes: ['session_name', 'session_id'],
      order: [
        ['c_id', 'DESC']
      ]
    }) //Returns only the id and name of added Session
  ),

  removeSession: ({ session_id, c_id }) => models.Session.findOne({
    raw: true,
    where: { session_id },
    attributes: ['session_id', 'session_name'],
    include:[{
      model: models.Client,
      attributes: ['lname', 'fname'],
      required: false,
      where: { c_id }
    }]
  }).then(
    res => {
      models.Session.destroy({
        where: { session_id }
      })
      return res; //Returns only the id and name of the deleted Session along with the client's name
    }
  ),

   //Update Session Name
  updateSessionName: ({ session_id, session_name }) => models.Session.update({ session_name }, {
    where: { session_id },
    returning: false
  }).then(
    res => models.Session.findOne({
      raw: true,
      where: { session_id },
      attributes: ['session_id', 'session_name']
    }) //returns the fields updated
  ),

  //Update Date of Session
  updateSessionDate: ({ session_id, date_of_session }) => models.Session.update({ date_of_session }, {
    where: { session_id },
    returning: false
  }).then(
    res => models.Session.findOne({
      raw: true,
      where: { session_id },
      attributes: ['session_id', 'session_name', 'date_of_session']
    }) //returns the fields updated
  ),
}

module.exports = resolver;