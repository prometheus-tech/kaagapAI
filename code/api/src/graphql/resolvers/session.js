import GraphQlUUID from 'graphql-type-uuid';
export default {
  UUID: GraphQlUUID,

  Session: {
    documents: ({ session_id }, args, { models }) => {
      return models.Session_Document.findAll({ 
        where: { 
          session_id,
          archive_status: 'active'
        } 
      });
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

    deleteSession: async (parent, { session_id }, { models }) => {
      await models.Session.update(
        { archive_status: "archived" },
        {
          where: { session_id }
      })
      
      await models.Session_Document.update(
        { archive_status: "archived" },
        {
          where: { session_id }
      })

      return await models.Session.findOne({
        raw: true,
        where: { session_id }
      });
    },

    restoreSession: async (parent, { session_id }, { models }) => {
      await models.Session.update(
        { archive_status: "active" },
        {
          where: { session_id }
      })
      
      await models.Session_Document.update(
        { archive_status: "active" },
        {
          where: { session_id }
      })

      return await models.Session.findOne({
        raw: true,
        where: { session_id }
      });
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
