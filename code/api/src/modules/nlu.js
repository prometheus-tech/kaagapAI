var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: 'hJxegcYhRcW8uh4uFV-k96tLJh_e8tEefRuOjbcNGD5C',
  url: 'https://gateway-tok.watsonplatform.net/natural-language-understanding/api'
});

const analyzeContent = async(contents) => {
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
  
  return new Promise((resolve, reject) => {
    nlu.analyze(parameters, (err, response) => { 
      if(err) {
        reject();
      } else {
        resolve(response);
      }
    });
  }).catch((err) => {

  })
}

export default {
  analyzeContent
}