export default {
  Session: {
    documents: ({ session_id }, args, { models }) => {
      return models.Session_Document.findAll({ where: { session_id } });
    }
  },

  Query: {
    session: async (parent, { session_id }, { models }) => {
      return await models.Session.findOne({ where: { session_id } });
    }
  },

  Mutation: {
    addSession: async (
      parent,
      { session_name, date_of_session, c_id },
      { models }
    ) => {
      const addSessionRes = await models.Session.create({
        session_name,
        date_of_session,
        c_id
      });

      const { session_id } = addSessionRes.dataValues;

      return await models.Session.findOne({
        raw: true,
        where: {
          session_id
        }
      });
    },

    deleteSession: async (parent, { session_id, c_id }, { models }) => {
      const deleteSessionRes = await models.Session.findOne({
        raw: true,
        where: { session_id }
      });

      await models.Session.destroy({
        where: { session_id, c_id }
      });

      return deleteSessionRes;
    },
    
    updateSessionInformation: async (
      parent,
      { session_id, session_name, date_of_session },
      { models }
    ) => {
      await models.Session.update(
        {
          session_name,
          date_of_session
        },
        {
          where: { session_id }
        }
      );

      return await models.Session.findOne({
        raw: true,
        where: { session_id }
      });
    }
  }
};
