import GraphQlUUID from 'graphql-type-uuid';

export default {
  UUID: GraphQlUUID,

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

      // const getSessionDocumentContent = await models.Session_Document.findAll({
      //   attributes: ['content'],
      //   where: { 
      //     session_id,
      //     archive_status: 'active'
      //   } 
      // });

      // console.log(getSessionDocumentContent.dataValues);
      var contents = "";

      const addResultRes = await models.Result.create({
        date_generated,
        session_id
      });

      const { result_id } = addResultRes.dataValues;

      var parameters = {
        "text" : contents,
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
          // console.log(JSON.stringify(response, null, 2));
        }
      });

      return await models.Result.findOne({
        raw: true,
        where: { result_id }
        //include child tables here
      });
    },
  }
};