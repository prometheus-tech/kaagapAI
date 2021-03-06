const GraphQlUUID = require('graphql-type-uuid');
const uploadModules = require('../../modules/upload_modules');
const downloadsFolder = require('downloads-folder');
const documentModules = require('../../modules/document_modules');
const {
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server-express');
const Sequelize = require('sequelize');

module.exports = {
  UUID: GraphQlUUID,

  Query: {
    sessionDocument: async (parent, { sd_id }, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return await models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        });
      }
    }
  },

  Mutation: {
    uploadSessionDocument: (
      parent,
      { file, session_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return uploadModules
          .uploadFile(file, session_id)
          .then(
            async ({
              session_id,
              fileName,
              filePath,
              translation,
              mimetype
            }) => {
              const addFileRes = await models.Session_Document.create({
                session_id,
                file: filePath,
                file_name: fileName,
                content: translation,
                type: mimetype,
                attachment: false,
                date_added: new Date()
              });
              const { sd_id } = addFileRes.dataValues;
              return sd_id;
            }
          )
          .then(async sd_id => {
            await models.Result.destroy({ where: { session_id } });

            return models.Session_Document.findOne({
              raw: true,
              where: { sd_id }
            });
          });
      }
    },

    uploadSessionAttachment: (
      parent,
      { file, session_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return uploadModules
          .uploadAttachment(file, session_id)
          .then(
            async ({
              session_id,
              fileName,
              filePath,
              translation,
              mimetype
            }) => {
              const addFileRes = await models.Session_Document.create({
                session_id,
                file: filePath,
                file_name: fileName,
                content: null,
                type: mimetype,
                attachment: true,
                should_analyze: false,
                date_added: new Date()
              });
              const { sd_id } = addFileRes.dataValues;
              return sd_id;
            }
          )
          .then(async sd_id => {
            return models.Session_Document.findOne({
              raw: true,
              where: { sd_id }
            });
          });
      }
    },

    editSessionDocument: async (
      parent,
      { content, sd_id, file_name },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const session_document = await models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        });

        var document_content = null;
        if (content && !session_document.attachment) {
          document_content = content;
        } else if (!content && !session_document.attachment) {
          return new ApolloError(
            'Content should not be empty',
            'NULL_CONTENT_ERROR'
          );
        }

        await models.Session_Document.update(
          {
            content: document_content,
            last_modified: new Date(),
            file_name
          },
          {
            where: { sd_id }
          }
        );

        const sessionDocument = await models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        });

        await models.Result.destroy({
          where: { session_id: sessionDocument.session_id }
        });

        return sessionDocument;
      }
    },

    deleteSessionDocument: async (
      parent,
      { sd_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        await models.Session_Document.update(
          {
            status: 'archived'
          },
          {
            where: { sd_id }
          }
        );

        const sessionDocument = await models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        });

        await models.Result.destroy({
          where: { session_id: sessionDocument.session_id }
        });

        return sessionDocument;
      }
    },

    restoreSessionDocument: async (
      parent,
      { sd_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        })
          .then(res => {
            if (!res) {
              throw new ForbiddenError('Session Document does not exist');
            } else {
              return models.Session.findOne({
                raw: true,
                where: { session_id: res.session_id }
              });
            }
          })
          .then(async res => {
            if (res.status == 'archived') {
              throw new ForbiddenError(
                'Session has been deleted, please restore session folder first.'
              );
            } else {
              await models.Session_Document.update(
                {
                  status: 'active'
                },
                {
                  where: { sd_id }
                }
              );

              const sessionDocument = await models.Session_Document.findOne({
                raw: true,
                where: { sd_id }
              });

              await models.Result.destroy({
                where: { session_id: sessionDocument.session_id }
              });

              return sessionDocument;
            }
          });
      }
    },

    permanentlyDeleteSessionDocument: async (
      parent,
      { sd_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const session_document = await models.Session_Document.findOne({
          raw: true,
          where: {
            sd_id,
            status: 'archived'
          }
        });

        if (session_document) {
          documentModules.deleteFileFromGCS(session_document.file);
        }

        await models.Session_Document.destroy({
          where: {
            sd_id: session_document.sd_id
          }
        });

        return session_document;
      }
    },

    updateShouldAnalyze: async (
      parent,
      { sd_id },
      { models, practitioner }
    ) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const sessionDocument = await models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        });

        let shouldAnalyze = null;

        if (sessionDocument.should_analyze) {
          shouldAnalyze = false;
        } else {
          shouldAnalyze = true;
        }

        return await models.Session_Document.update(
          {
            should_analyze: shouldAnalyze
          },
          {
            where: { sd_id }
          }
        ).then(async res => {
          await models.Result.destroy({
            where: { session_id: sessionDocument.session_id }
          });
          return await models.Session_Document.findOne({
            raw: true,
            where: { sd_id }
          });
        });
      }
    },

    downloadSessionDocument: (parent, { sd_id }, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Session_Document.findOne({
          raw: true,
          where: { sd_id }
        }).then(async res => {
          const filename = res.file.split('gs://kaagapai2019/')[1];
          const originalFilename = res.file_name;
          const savePath = downloadsFolder() + '/';

          await documentModules.getFileFromGCS(
            filename,
            savePath,
            originalFilename
          );

          return res;
        });
      }
    },

    getFile: async (parent, { sd_id }, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const Op = Sequelize.Op;
        const file = await models.Session_Document.findOne({
          raw: true,
          where: {
            sd_id
          }
        });

        if (file) {
          const filename = file.file.split('gs://kaagapai2019/')[1];
          const url = documentModules.getImageUrl(filename);

          return url;
        }
      }
    }
  }
};
