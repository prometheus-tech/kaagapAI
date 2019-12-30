require('dotenv').config();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

var nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({ apikey: process.env.NLU_API_KEY }),
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

const analyzeContent = async contents => {
  var parameters = {
    text: contents.join(),
    features: {
      entities: {
        // "model" : "735eff45-513d-499d-90bc-b4b72ead789e"
      },
      sentiment: {},
      categories: {},
      keywords: {},
      emotion: {}
    }
  };

  return new Promise((resolve, reject) => {
    nlu.analyze(parameters, (err, response) => {
      if (err) {
        reject();
      } else {
        resolve(response);
      }
    });
  }).catch(err => {});
};

const analyzeEmotion = async text => {
  var parameters = {
    text: text,
    features: {
      emotion: {}
    }
  };

  return new Promise((resolve, reject) => {
    nlu.analyze(parameters, (err, response) => {
      if (err) {
        reject();
      } else {
        console.log(response);
        resolve(response);
      }
    });
  }).catch(err => {});
};

const analyzeSentiment = async text => {
  var parameters = {
    text: text,
    features: {
      sentiment: {}
    }
  };

  return new Promise((resolve, reject) => {
    nlu.analyze(parameters, (err, response) => {
      if (err) {
        reject();
      } else {
        resolve(response);
      }
    });
  }).catch(err => {});
};

module.exports = {
  analyzeContent,
  analyzeEmotion,
  analyzeSentiment
};
