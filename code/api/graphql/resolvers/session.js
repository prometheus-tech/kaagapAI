const models = require('../../models');

const resolver = {
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

  updateSessionInformation: ({ session_id, session_name, date_of_session }) => models.Session.update({ 
    session_name,
    date_of_session
  }, {
    where: { session_id },
    returning: false
  }).then(
    res => models.Session.findOne({
      raw: true,
      where: { session_id }
    }) //returns the fields updated
  ),
}

module.exports = resolver;