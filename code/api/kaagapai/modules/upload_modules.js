'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _document_modules = require('./document_modules');

var _document_modules2 = _interopRequireDefault(_document_modules);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uploadFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(file, session_id) {
    var _ref2, filename, mimetype, createReadStream, inputPath, stream, translation, fileName, newFileName, filePath, getAudioTranslation, params, _getAudioTranslation, transcript;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return file;

          case 2:
            _ref2 = _context4.sent;
            filename = _ref2.filename;
            mimetype = _ref2.mimetype;
            createReadStream = _ref2.createReadStream;
            inputPath = './src/tmp/' + filename;
            stream = createReadStream();
            translation = null;
            fileName = filename;
            _context4.next = 12;
            return _document_modules2.default.storeUpload({ stream: stream, inputPath: inputPath });

          case 12:
            _context4.next = 14;
            return _document_modules2.default.renameFile({ inputPath: inputPath, session_id: session_id });

          case 14:
            newFileName = _context4.sent;
            filePath = 'gs://kaagapai-files/' + newFileName;

            if (!(mimetype.indexOf('wave') + 1)) {
              _context4.next = 28;
              break;
            }

            inputPath = './src/tmp/' + newFileName;
            filePath = 'gs://kaagapai-files/' + newFileName;

            _context4.next = 21;
            return _document_modules2.default.uploadGCS(inputPath);

          case 21:
            getAudioTranslation = function getAudioTranslation() {
              return new Promise(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                  var transcription;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _document_modules2.default.extractText(filePath);

                        case 2:
                          transcription = _context.sent;
                          _context.next = 5;
                          return _document_modules2.default.translateText(transcription);

                        case 5:
                          translation = _context.sent;

                          resolve(translation);

                        case 7:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }());
            };

            _context4.next = 24;
            return getAudioTranslation();

          case 24:
            translation = _context4.sent;
            return _context4.abrupt('return', { session_id: session_id, fileName: fileName, filePath: filePath, mimetype: mimetype, translation: translation });

          case 28:
            if (!(mimetype.indexOf('audio') + 1)) {
              _context4.next = 46;
              break;
            }

            _context4.prev = 29;

            inputPath = './src/tmp/' + newFileName;
            newFileName = _path2.default.parse(newFileName).name + '.wav';
            filePath = 'gs://kaagapai-files/' + newFileName;
            params = {
              inputPath: inputPath,
              outputPath: './src/tmp/' + newFileName
            };

            _getAudioTranslation = function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt('return', new Promise(function (resolve) {
                          return _document_modules2.default.convert(params.inputPath, params.outputPath).then(function (wavFile) {
                            _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                              var transcription;
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return _document_modules2.default.extractText('gs://kaagapai-files/' + wavFile.name);

                                    case 2:
                                      transcription = _context2.sent;
                                      _context2.next = 5;
                                      return _document_modules2.default.translateText(transcription);

                                    case 5:
                                      translation = _context2.sent;

                                      resolve(translation);

                                    case 7:
                                    case 'end':
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, undefined);
                            }))();
                          });
                        }));

                      case 1:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function _getAudioTranslation(_x4) {
                return _ref4.apply(this, arguments);
              };
            }();

            _context4.next = 37;
            return _getAudioTranslation(params);

          case 37:
            translation = _context4.sent;
            return _context4.abrupt('return', { session_id: session_id, fileName: fileName, filePath: filePath, mimetype: mimetype, translation: translation });

          case 41:
            _context4.prev = 41;
            _context4.t0 = _context4['catch'](29);

            console.log(_context4.t0);

          case 44:
            _context4.next = 56;
            break;

          case 46:
            inputPath = './src/tmp/' + newFileName;
            _context4.next = 49;
            return _document_modules2.default.extractDocumentText(inputPath);

          case 49:
            transcript = _context4.sent;
            _context4.next = 52;
            return _document_modules2.default.translateText(transcript);

          case 52:
            translation = _context4.sent;
            _context4.next = 55;
            return _document_modules2.default.uploadGCS(inputPath);

          case 55:
            return _context4.abrupt('return', { session_id: session_id, fileName: fileName, filePath: filePath, mimetype: mimetype, translation: translation });

          case 56:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[29, 41]]);
  }));

  return function uploadFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  uploadFile: uploadFile
};