import GraphQlUUID from 'graphql-type-uuid';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import Sequelize from 'sequelize';

export default {
  UUID: GraphQlUUID,
  
  Client: {
    sessions: ({ c_id }, args, { models }) => {
      if (!args.orderByInput || !args.orderByColumn) {
        args.orderByColumn = 'session_name';
        args.orderByInput = 'ASC';
      }
      
      return models.Session.findAll({ 
        where: { 
          c_id,
          status: 'active'
        },
        order: [
          [args.orderByColumn, args.orderByInput],
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
    },

    searchsession: async ({ c_id }, args, { models }) => {
      const Op = Sequelize.Op;
      return models.Session.findAll({
        where: {
          c_id,
          session_name: {
            [Op.like]: args.filter
          }
        }
      })
    }
  },

  Query: {
    clients: (parent, args, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        if (!args.orderByInput || !args.orderByColumn) {
          args.orderByColumn = 'lname';
          args.orderByInput = 'ASC';
        }

        return models.Client.findAll({
          raw: true,
          where: { 
            p_id: practitioner,
            status: 'active'
          },
          order: [
            [args.orderByColumn, args.orderByInput]
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

    searchclients: (parent, { name }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        var filter = name.split(" ");
        const Op = Sequelize.Op;
        return models.Client.findAll({
          raw: true,
          where: { 
            p_id: practitioner,
            status: 'active',
            fname: {
              [Op.like]: filter[0],
            },
            lname: {
              [Op.like]: filter[filter.length-1]
            }
          }
        });
      }
    }
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

    restoreClient: async (parent, { c_id }, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        await models.Client.update({ 
          status: "active" 
        }, {
            where: { c_id }
        })
        
        return await models.Client.findOne({
          raw: true,
          where: { c_id }
        });
      }
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
