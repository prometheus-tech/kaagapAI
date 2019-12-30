const GraphQlUUID = require('graphql-type-uuid');
const {
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server-express');
const Sequelize = require('sequelize');
const documentModules = require('../../modules/document_modules');

module.exports = {
  UUID: GraphQlUUID,

  Session: {
    documents: ({ session_id }, args, { models }) => {
      if (!args.orderByInput || !args.orderByColumn) {
        args.orderByColumn = 'file_name';
        args.orderByInput = 'ASC';
      }

      return models.Session_Document.findAll({
        where: {
          session_id,
          status: 'active'
        },
        order: [[args.orderByColumn, args.orderByInput]]
      });
    },

    searchdocument: ({ session_id }, args, { models }) => {
      const Op = Sequelize.Op;
      return models.Session_Document.findAll({
        where: {
          session_id,
          status: 'active',
          file_name: {
            [Op.like]: args.filter
          }
        }
      });
    }
  },

  Query: {
    session: async (parent, { session_id }, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return await models.Session.findOne({ where: { session_id } });
      }
    }
  },

  Mutation: {
    addSession: async (
      parent,
      { session_name, date_of_session, c_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
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
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        await models.Session.update(
          {
            status: 'archived'
          },
          {
            where: { session_id }
          }
        );

        await models.Session_Document.update(
          {
            status: 'archived'
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
    },

    restoreSession: async (
      parent,
      { session_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Session.findOne({
          raw: true,
          where: { session_id }
        })
          .then(res => {
            if (!res) {
              throw new ForbiddenError('Session does not exist');
            } else {
              return models.Client.findOne({
                raw: true,
                where: { c_id: res.c_id }
              });
            }
          })
          .then(async res => {
            if (res.status == 'archived') {
              throw new ForbiddenError(
                'Client has been deleted, please restore client first.'
              );
            } else {
              await models.Session.update(
                {
                  status: 'active'
                },
                {
                  where: { session_id }
                }
              );

              await models.Session_Document.update(
                {
                  status: 'active'
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
          });
      }
    },

    permanentlyDeleteSession: async (
      parent,
      { session_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const session = await models.Session.findOne({
          raw: true,
          where: {
            session_id,
            status: 'archived'
          }
        });

        if (session) {
          const session_documents = await models.Session_Document.findAll({
            raw: true,
            where: {
              session_id,
              status: 'archived'
            }
          });

          if (session_documents) {
            session_documents.forEach(session_document => {
              documentModules.deleteFileFromGCS(session_document.file);
            });
          }

          await models.Session.destroy({
            where: { session_id: session.session_id }
          });

          return session;
        }
      }
    },

    updateSessionInformation: async (
      parent,
      { session_id, session_name, date_of_session },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
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
  }
};
