import GraphQlUUID from 'graphql-type-uuid';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

export default {
  UUID: GraphQlUUID,
  
  Client: {
    sessions: ({ c_id, orderByInput, orderByColumn }, args, { models }) => {
      if (!orderByInput || !orderByColumn) {
        orderByColumn = 'session_name';
        orderByInput = 'ASC';
      }
      
      return models.Session.findAll({ 
        where: { 
          c_id,
          status: 'active'
        },
        order: [
          [orderByColumn, orderByInput],
        ] 
      });
    },

    no_of_sessions: ({ c_id }, args, { models }) => {
      return models.Session.count({ 
        where: { 
          c_id ,
          status: 'active'
        } 
      });
    }
  },

  Query: {
    clients: (parent, { orderByInput, orderByColumn }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        if (!orderByInput || !orderByColumn) {
          orderByColumn = 'lname';
          orderByInput = 'ASC';
        }

        return models.Client.findAll({
          raw: true,
          where: { 
            p_id: practitioner,
            status: 'active'
          },
          order: [
            [orderByColumn, orderByInput]
          ]
        });
      }
    },

    client: async (parent, { c_id }, { models, practitioner }) => { //add user after models,
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const client = await models.Client.findOne({ 
          where: { 
            c_id,
            p_id: practitioner
          } 
        });

        if(!client) {
          throw new ForbiddenError('Unauthorized Access')
        } else {
          await models.Client.update({
            last_opened: new Date()
          }, { 
            where: { c_id } 
          });
  
          return client;
        }
      }
    },
  },

  Mutation: {
    addClient: async (
      parent,
      { fname, lname, gender, birthdate },
      { models, practitioner }
    ) => {
      const addClientRes = await models.Client.create({
        fname,
        lname,
        gender,
        birthdate,
        p_id: practitioner,
        date_added: new Date()
      });

      const { c_id } = addClientRes.dataValues;

      return await models.Client.findOne({
        raw: true,
        where: { c_id }
      });
    },

    deleteClient: async (parent, { c_id }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const client = await models.Client.findOne({ 
          where: { 
            c_id,
            p_id: practitioner
          } 
        });

        if(!client) {
          throw new ForbiddenError('Unauthorized Access');
        } else {
          await models.Client.update({ 
            status: "archived" 
          }, {
              where: { c_id }
          })
          
          await models.Session.update({ 
            status: "archived" 
          }, {
              where: { c_id }
          })
          
          await models.Session.findAll({
            where: { c_id },
            attributes: [ "session_id"]
          }).then(res => {
            res.forEach(element => {
              let id = element.dataValues.session_id
    
              models.Session_Document.update({ 
                status: "archived" 
              }, {
                where: { session_id: id }
              })
            })
          })
    
          return await models.Client.findOne({
            raw: true,
            where: { c_id }
          });
        }
      }
    },

    restoreClient: async (parent, { c_id }, { models }) => {
      await models.Client.update({ 
        status: "active" 
      }, {
          where: { c_id }
      })
      
      await models.Session.update({ 
        status: "active" 
      }, {
          where: { c_id }
      })
      
      await models.Session.findAll({
        where: { c_id },
        attributes: [ "session_id"]
      }).then(res => {
        res.forEach(element => {
          let id = element.dataValues.session_id

          models.Session_Document.update({ 
            status: "active" 
          }, {
            where: { session_id: id }
          })
        })
      })

      return await models.Client.findOne({
        raw: true,
        where: { c_id }
      });
    },
    
    updateClientInformation: async (
      parent,
      { c_id, fname, lname, birthdate, gender },
      { models, practitioner }
    ) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const client = await models.Client.findOne({ 
          where: { 
            c_id,
            p_id: practitioner
          } 
        });

        if(!client) {
          throw new ForbiddenError('Unauthorized Access');
        } else {
          await models.Client.update({
            fname,
            lname,
            birthdate,
            gender
          }, {
            where: { c_id }
          });
    
          return await models.Client.findOne({
            raw: true,
            where: { c_id }
          });
        }
      }
    }
  }
};
