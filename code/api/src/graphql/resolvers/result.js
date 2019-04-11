import GraphQlUUID from 'graphql-type-uuid';

export default {
  UUID: GraphQlUUID,

  Result: {
    categories: ({ result_id }, args, { models }) => {
      return models.Category.findAll({ 
        where: { 
          result_id
        }
      });
    },
    entities: ({ result_id }, args, { models }) => {
      return models.Entity.findAll({ 
        where: { 
          result_id
        }
      });
    },
    emotions: ({ result_id }, args, { models }) => {
      return models.Emotion.findAll({ 
        where: { 
          result_id
        }
      });
    },
    sentiment: ({ result_id }, args, { models }) => {
      return models.Sentiment.findAll({ 
        where: { 
          result_id
        }
      });
    },
    keywords: ({ result_id }, args, { models }) => {
      return models.Keyword.findAll({ 
        where: { 
          result_id
        }
      });
    }
  },

  Query: {
    result: (parent, { session_id }, { models }) => {
      return models.Result.findOne({
        where: { session_id }
      })
    }
  },

  Mutation: {
    generateResults: async (
      parent, 
      { date_generated, session_id },
      { models }
    ) => {
      //NLU
      var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

      var nlu = new NaturalLanguageUnderstandingV1({
        version: '2018-11-16'
      });

      var contents = [];

      const getSessionDocumentContent = await models.Session_Document.findAll({
        raw: true,
        attributes: ['content'],
        where: { 
          session_id,
          archive_status: 'active'
        } 
      }).then(results => {
        results.forEach((result) => {
          contents.push(result.content);
        });
      });

      const addResultRes = await models.Result.create({
        date_generated,
        session_id
      });

      const { result_id } = addResultRes.dataValues;

      var parameters = {
        "text" : contents.join(),
        "features" : {
          "entities" : {
            // "model" : "735eff45-513d-499d-90bc-b4b72ead789e"
          },
          "sentiment" : {},
          "categories" : {},
          "keywords" : {},
          "emotion" : {}
        } 
      }

      //insert code for storing in Results' child tables
      nlu.analyze(parameters, (err, response) => {
        if(err) {
          console.log(err);
        } else {
          //store sentiment to db
          models.Sentiment.create({
            score: response.sentiment.document.score,
            label: response.sentiment.document.label,
            result_id
          });

          //store keywords to db
          var keywordsRes = response.keywords;

          keywordsRes.forEach((keywordRes) => {
            models.Keyword.create({
              text: keywordRes.text,
              relevance: keywordRes.relevance,
              count: keywordRes.count,
              result_id
            });
          });

          //store categories to db
          var categoriesRes = response.categories;

          categoriesRes.forEach((categoryRes) => {
            models.Category.create({
              score: categoryRes.score,
              label: categoryRes.label,
              result_id
            });
          });

          //store entities to db
          var entitiesRes = response.entities;

          entitiesRes.forEach((entityRes) => {
            models.Entity.create({
              type: entityRes.type,
              text: entityRes.text,
              relevance: entityRes.relevance,
              result_id
            });
          });

          //store emotions to db
          models.Emotion.create({
            sadness: response.emotion.document.emotion.sadness,
            anger: response.emotion.document.emotion.anger,
            joy: response.emotion.document.emotion.joy,
            fear: response.emotion.document.emotion.fear,
            disgust: response.emotion.document.emotion.disgust,
            result_id
          });
        }
      });

      return await models.Result.findOne({
        raw: true,
        where: { result_id }
      });
    },
  }
};