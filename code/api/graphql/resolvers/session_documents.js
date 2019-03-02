const models = require('../../models');

const resolver = {
  getSessionDocuments: ({ session_id }) => models.Session_Document.findAll({
    raw: true,
    where: { session_id },
    attributes: {
      exclude: ['content']
    }
  }),

  getSessionDocument: ({ sd_id }) => models.Session_Document.findOne({
    raw: true, 
    where: { sd_id },
    attributes: ['sd_id', 'file', 'file_name']
  }),
}

module.exports = resolver;