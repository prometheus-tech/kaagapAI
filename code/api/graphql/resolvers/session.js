const Sequelize = require('sequelize');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const GraphQlJSON = require('graphql-type-json');
const models = require('../../models');

const resolver = {
  getSessions: ({ c_id }) => models.Session.findAll({
    raw: true,
    where: { c_id }
  }),

  getSessionDocuments: ({ c_id }) => models.Session.findAll({
    raw: true,
    attributes: {
      include: ['*']
    },
    include:[{
      model: models.Session_Document,
      attributes: [],
      required: false
    }],
    group: ['Session.session_id'],
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