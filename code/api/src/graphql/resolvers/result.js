import GraphQlUUID from 'graphql-type-uuid';
import nluModules from '../../modules/nlu';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

export default {
  UUID: GraphQlUUID,

  Result: {
    categories: ({ result_id }, args, { models }) => {
      return models.Category.findAll({
        where: { result_id }
      });
    },

    entities: ({ result_id }, args, { models }) => {
      return models.Entity.findAll({
        where: { result_id }
      });
    },

    emotions: ({ result_id }, args, { models }) => {
      return models.Emotion.findAll({
        where: { result_id }
      });
    },

    sentiment: ({ result_id }, args, { models }) => {
      return models.Sentiment.findAll({
        where: { result_id }
      });
    },

    keywords: ({ result_id }, args, { models }) => {
      return models.Keyword.findAll({
        where: { result_id }
      });
    }
  },

  Query: {
    result: async (
      parent, {
        session_id
      }, { models, practitioner }
    ) => {
      if(!practitioner){
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Result.findOne({
          where: { session_id },
          order: [
            ['date_generated', 'DESC']
          ]
        }).then(async res => {
          if(!res) {
            var contents = [];
  
            const getSessionDocumentContent = await models.Session_Document.findAll({
              raw: true,
              attributes: ['content'],
              where: {
                session_id,
                status: 'active'
              }
            })

            if(!getSessionDocumentContent){
              return res;
            } else {
              await getSessionDocuments.forEach((sessionDocument) => {
                contents.push(sessionDocument.content);
              });
    
              const addResultRes = await models.Result.create({
                date_generated: new Date(),
                session_id
              });
    
              const { result_id } = addResultRes.dataValues;
    
              await nluModules.analyzeContent(contents)
                .then(async response => {
    
                  //store sentiment to db
                  await models.Sentiment.create({
                    score: response.sentiment.document.score,
                    label: response.sentiment.document.label,
                    result_id
                  });
    
                  //store keywords to db
                  var keywordsRes = response.keywords;
    
                  keywordsRes.forEach(async (keywordRes) => {
                    await models.Keyword.create({
                      text: keywordRes.text,
                      relevance: keywordRes.relevance,
                      count: keywordRes.count,
                      result_id
                    });
                  });
    
                  //store categories to db
                  var categoriesRes = response.categories;
    
                  categoriesRes.forEach(async (categoryRes) => {
                    await models.Category.create({
                      score: categoryRes.score,
                      label: categoryRes.label,
                      result_id
                    });
                  });
    
                  //store entities to db
                  var entitiesRes = response.entities;
    
                  entitiesRes.forEach(async (entityRes) => {
                    await models.Entity.create({
                      type: entityRes.type,
                      text: entityRes.text,
                      relevance: entityRes.relevance,
                      result_id
                    });
                  });
    
                  //store emotions to db
                  await models.Emotion.create({
                    sadness: response.emotion.document.emotion.sadness,
                    anger: response.emotion.document.emotion.anger,
                    joy: response.emotion.document.emotion.joy,
                    fear: response.emotion.document.emotion.fear,
                    disgust: response.emotion.document.emotion.disgust,
                    result_id
                  });
    
                  return result_id;
                });
    
                return await models.Result.findOne({
                  raw: true,
                  where: { result_id }
                });
            }
          } else {
            const session = await models.Session.findOne({
              where: { session_id: res.session_id }
            });

            const client = await models.Client.findOne({
              where: {
                p_id: practitioner,
                c_id: session.c_id
              }
            });

            if(!client) {
              throw new ForbiddenError('Unauthorized Access');
            } else {
              return res;
            }
          }
        })
      }
    }
  }
};