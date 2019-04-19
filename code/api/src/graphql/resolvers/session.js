import GraphQlUUID from 'graphql-type-uuid';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

export default {
  UUID: GraphQlUUID,

  Session: {
    documents: ({ session_id }, args, { models }) => {
      return models.Session_Document.findAll({ 
        where: { 
          session_id,
          status: 'active'
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
      { models, practitioner }
    ) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const addSessionRes = await models.Session.create({
          session_name,
          date_of_session,
          c_id
        });
  
        const { session_id } = addSessionRes.dataValues;
  
        return await models.Session.findOne({
          raw: true,
          where: { session_id }
        });
      }
    },

    deleteSession: async (parent, { session_id }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        await models.Session.update({ 
          status: "archived" 
        }, {
          where: { session_id }
        })
        
        await models.Session_Document.update({ 
          status: "archived" 
        }, {
          where: { session_id }
        })
  
        return await models.Session.findOne({
          raw: true,
          where: { session_id }
        });
      }
    },

    restoreSession: async (parent, { session_id }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Session.findOne({
          raw: true,
          where: { session_id }
        }).then( res => {
          return models.Client.findOne({
            raw: true,
            where: { c_id: res.c_id }
          })
        }).then( async res => {
          if(res.status == 'archived'){
            throw new ForbiddenError('Client has been deleted, please restore client first.');
          } else {
            await models.Session.update({ 
              status: "active" 
            }, {
              where: { session_id }
            })

            return await models.Session.findOne({
              raw: true,
              where: { session_id }
            });
          }
        })
      }
    },
    
    updateSessionInformation: async (
      parent,
      { session_id, session_name, date_of_session },
      { models, practitioner }
    ) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        await models.Session.update({
          session_name,
          date_of_session
        }, {
          where: { session_id }
        });
  
        return await models.Session.findOne({
          raw: true,
          where: { session_id }
        });
      }
    }
  }
};
