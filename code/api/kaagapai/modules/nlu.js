'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: 'hJxegcYhRcW8uh4uFV-k96tLJh_e8tEefRuOjbcNGD5C',
  url: 'https://gateway-tok.watsonplatform.net/natural-language-understanding/api'
});

var analyzeContent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contents) {
    var parameters;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parameters = {
              "text": contents.join(),
              "features": {
                "entities": {
                  // "model" : "735eff45-513d-499d-90bc-b4b72ead789e"
                },
                "sentiment": {},
                "categories": {},
                "keywords": {},
                "emotion": {}
              }
            };
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              nlu.analyze(parameters, function (err, response) {
                if (err) {
                  reject();
                } else {
                  resolve(response);
                }
              });
            }).catch(function (err) {}));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function analyzeContent(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  analyzeContent: analyzeContent
};