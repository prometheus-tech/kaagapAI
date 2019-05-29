import GraphQlUUID from 'graphql-type-uuid';
import nluModules from '../../modules/nlu';
import resultModules from '../../modules/results_module';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import uuid from 'uuid/v4';
import arraySort from 'array-sort';

export default {
  UUID: GraphQlUUID,

  Result: {
    categories: ({ result_id }, args, { models }) => {
      return models.Category.findAll({
        where: { result_id },
        order: [['score', 'DESC']]
      });
    },

    entities: ({ result_id }, args, { models }) => {
      return models.Entity.findAll({
        where: { result_id },
        order: [['relevance', 'DESC']]
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
        where: { result_id },
        order: [['count', 'DESC'], ['relevance', 'DESC']]
      });
    }
  },

  Query: {
    result: async (parent, { session_id }, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        return models.Result.findOne({
          where: { session_id },
          order: [['date_generated', 'DESC']]
        }).then(async res => {
          if (!res) {
            return models.Session_Document.findAll({
              raw: true,
              attributes: ['content'],
              where: {
                session_id,
                status: 'active',
                should_analyze: true
              }
            }).then(async sessionDocuments => {
              if (sessionDocuments.length == 0) {
                return res;
              } else {
                var contents = [];

                await sessionDocuments.forEach(sessionDocument => {
                  contents.push(sessionDocument.content);
                });

                const addResultRes = await models.Result.create({
                  date_generated: new Date(),
                  session_id
                });

                const { result_id } = addResultRes.dataValues;

                await nluModules
                  .analyzeContent(contents)
                  .then(async response => {
                    //store sentiment to db
                    await models.Sentiment.create({
                      score: response.sentiment.document.score,
                      label: response.sentiment.document.label,
                      result_id
                    });

                    //store keywords to db
                    var keywordsRes = response.keywords;

                    keywordsRes.forEach(async keywordRes => {
                      await models.Keyword.create({
                        text: keywordRes.text,
                        relevance: keywordRes.relevance,
                        count: keywordRes.count,
                        result_id
                      });
                    });

                    //store categories to db
                    var categoriesRes = response.categories;

                    categoriesRes.forEach(async categoryRes => {
                      await models.Category.create({
                        score: categoryRes.score,
                        label: categoryRes.label,
                        result_id
                      });
                    });

                    //store entities to db
                    var entitiesRes = response.entities;

                    entitiesRes.forEach(async entityRes => {
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
            });
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

            if (!client) {
              throw new ForbiddenError('Unauthorized Access');
            } else {
              return res;
            }
          }
        });
      }
    },

    customSessionResult: async (parent, args, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const Op = Sequelize.Op;

        const sessionDocuments = await models.Session_Document.findAll({
          raw: true,
          where: {
            session_id: {
              [Op.in]: args.session_id
            },
            status: 'active',
            should_analyze: true
          }
        });

        var contents = [];
        sessionDocuments.forEach(document => {
          contents.push(document.content);
        });

        const result = await nluModules.analyzeContent(contents)

        const customSentiment = {
          custom_sentiment_id: uuid(),
          score: result.sentiment.document.score,
          label: result.sentiment.document.label
        }

        var keywords = result.keywords;
        var customKeyword = [];
        keywords.forEach(async (keyword) => {
          customKeyword.push({
            custom_keyword_id: uuid(),
            text: keyword.text,
            relevance: keyword.relevance,
            count: keyword.count
          });
        });

        var categories = result.categories;
        var customCategory = [];
        categories.forEach(async (category) => {
          customCategory.push({
            custom_category_id: uuid(),
            score: category.score,
            label: category.label
          });
        });

        var entities = result.entities;
        var customEntity = [];
        entities.forEach(async (entity) => {
          customEntity.push({
            custom_entity_id: uuid(),
            type: entity.type,
            text: entity.text,
            relevance: entity.relevance
          });
        });

        const customEmotion = {
          custom_emotion_id: uuid(),
          sadness: result.emotion.document.emotion.sadness,
          anger: result.emotion.document.emotion.anger,
          joy: result.emotion.document.emotion.joy,
          fear: result.emotion.document.emotion.fear,
          disgust: result.emotion.document.emotion.disgust
        };

        const results = await models.Result.findAll({
          raw: true,
          where: {
            session_id: {
              [Op.in]: args.session_id
            }
          }
        });

        const trends = results.map( async (result) => {
          return await models.Session.findOne({
            raw: true,
            where: { session_id: result.session_id }
          }).then( res => {
            var trend = {
              trend_id: uuid(),
              session_id: result.session_id,
              session_name: res.session_name,
              session_date: res.date_of_session
            }

            return trend;
          }).then( async res => {
            res.sentiment = await models.Sentiment.findOne({
              raw: true,
              where: { result_id: result.result_id }
            }).then(res => {
              return res;
            });

            return res;
          }).then( async res => {
            res.emotion = await models.Emotion.findOne({
              raw: true,
              where: { result_id: result.result_id }
            }).then(res => {
              return res;
            });
            
            return res;
          })
        });

        const trendsResult = await Promise.all(trends);
        arraySort(trendsResult, 'session_date');

        return {
          custom_result_id: uuid(),
          sentiment: customSentiment,
          keywords: customKeyword,
          categories: customCategory,
          entities: customEntity,
          emotion: customEmotion,
          trend: trendsResult
        };
      }
    },

    findTextOccurences: async (parent, args, { models, practitioner }) => {
      if (!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const Op = Sequelize.Op;

        const sessions = await models.Session.findAll({
          raw: true,
          where:{
            session_id: {
              [Op.in]: args.session_id
            }
          }
        });
        
        const textAppearances = sessions.map(async (session) => {
          return await models.Session_Document.findAll({
            raw: true,
            where: {
              session_id: session.session_id,
              status: 'active'
            }
          }).then(async session_documents => {
            const documents = await resultModules.getDocumentTalkTurns(session_documents);
            const matching_documents = await resultModules.searchMatchingTalkTurnsFromDocuments(documents, args.text);
            const appearanceDocuments = [];

            matching_documents.forEach((document) => {
              const talkTurns = [];
  
              document.matchingTalkTurns.forEach((talk_turn) => {
                talkTurns.push({
                  talk_turn_id: uuid(),
                  talk_turn_text: talk_turn
                });
              });
              
              appearanceDocuments.push({
                appearance_document_id: uuid(),
                sd_id: document.sd_id,
                file_name: document.file_name,
                talk_turns: talkTurns
              });
            });

            return appearanceDocuments;
          }).then(appearanceDocuments => {
              session.appearance_id = uuid();
              session.appearance_documents = appearanceDocuments;
              
              delete session.c_id;
              delete session.status;
              delete session.date_of_session;

              return session;
          })
        });

        const text_appearances = await Promise.all(textAppearances);
        const textOccurrence = {
          text_occurrence_id: uuid(),
          text: args.text,
          text_appearances: text_appearances
        }

        return textOccurrence;
      }
    },
    
    targetTextEmotion: async (parent, args, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const emotionResult = await nluModules.analyzeEmotion(args.text);

        const customEmotion = {
          custom_emotion_id: uuid(),
          sadness: emotionResult.emotion.document.emotion.sadness,
          anger: emotionResult.emotion.document.emotion.anger,
          joy: emotionResult.emotion.document.emotion.joy,
          fear: emotionResult.emotion.document.emotion.fear,
          disgust: emotionResult.emotion.document.emotion.disgust
        };

        return customEmotion;
      }
    },

    targetTextSentiment: async (parent, args, { models, practitioner }) => {
      if(!practitioner) {
        throw new AuthenticationError('You must be logged in');
      } else {
        const sentimentResult = await nluModules.analyzeSentiment(args.text);

        const customSentiment = {
          custom_sentiment_id: uuid(),
          score: sentimentResult.sentiment.document.score,
          label: sentimentResult.sentiment.document.label
        }

        return customSentiment;
      }
    }
  }
};
