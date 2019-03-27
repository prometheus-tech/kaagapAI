export default {
  Query: {
    getSessionDocuments: async (parent, { session_id }, { models }) => {
      return await models.Session_Document.findAll({
        raw: true,
        where: { session_id },
        attributes: {
          exclude: ['content']
        }
      });
    },
    getSessionDocument: async (parent, { sd_id }, { models }) => {
      return await models.Session_Document.findOne({
        raw: true,
        where: { sd_id },
        attributes: ['sd_id', 'file', 'file_name']
      });
    }
  }
};
