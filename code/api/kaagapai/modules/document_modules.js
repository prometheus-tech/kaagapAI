'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fluentFfmpeg = require('fluent-ffmpeg');

var _fluentFfmpeg2 = _interopRequireDefault(_fluentFfmpeg);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _textract = require('textract');

var _textract2 = _interopRequireDefault(_textract);

var _storage = require('@google-cloud/storage');

var _translate = require('@google-cloud/translate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//Google Cloud APIs


var speech = require('@google-cloud/speech').v1p1beta1;
var projectId = 'PT-kaagapai';

var storage = new _storage.Storage({
  projectId: projectId
});

var bucket = storage.bucket('kaagapai-files');

//renaming filename of files
var renameFile = function renameFile(_ref) {
  var inputPath = _ref.inputPath,
      session_id = _ref.session_id;

  var newFileName = session_id + '-' + _shortid2.default.generate() + _path2.default.parse(inputPath).ext;
  var newPath = './src/tmp/' + newFileName;

  return new Promise(function (resolve, reject) {
    (0, _fs.rename)(inputPath, newPath, function (err) {
      if (err) {
        reject();
      } else {
        resolve(newFileName);
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
};

//storing raw files to file system
var storeUpload = function storeUpload(_ref2) {
  var stream = _ref2.stream,
      inputPath = _ref2.inputPath;
  return new Promise(function (resolve, reject) {
    return stream.pipe((0, _fs.createWriteStream)(inputPath)).on('finish', function () {
      resolve();
    }).on('error', reject);
  });
};

//translating
var translateText = function translateText(text) {
  var translate = new _translate.Translate({
    projectId: projectId
  });

  var options = {
    from: 'tl',
    to: 'en'
  };

  return new Promise(function (resolve) {
    translate.translate(text, options).then(function (results) {
      var translation = results[0];
      resolve(translation);
    });
  }).catch(function (err) {
    console.log(err);
  });
};

//upload to google cloud storage
var uploadGCS = function uploadGCS(path) {
  return new Promise(function (resolve) {
    bucket.upload(path, function (err, file) {
      if (err) {
        console.log(err);
      } else {
        resolve(file);
        deleteTmp(path);
      }
    });
  });
};

//delete tmp file
var deleteTmp = function deleteTmp(path) {
  try {
    (0, _fs.unlinkSync)(path);
  } catch (ex) {
    console.log(ex);
  }
};

//convert audio file
var convert = function convert(inputPath, outputPath) {
  return new Promise(function (resolve) {
    (0, _fluentFfmpeg2.default)({ source: inputPath }).audioChannels(2).toFormat('wav').on('error', function (err) {
      console.log('An error occurred: ' + err.message);
    }).on('progress', function (progress) {
      console.log('Processing: ' + progress.targetSize + ' KB converted');
    }).on('end', function () {
      resolve(uploadGCS(outputPath));
      deleteTmp(inputPath);
    }).save(outputPath);
  });
};

//extract text from audio file
var extractText = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(gcsUri) {
    var client, config, audio, request, _ref4, _ref5, operation, _ref6, _ref7, response, transcription;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = new speech.SpeechClient();

            // The audio file's encoding, sample rate in hertz, and BCP-47 language code

            config = {
              encoding: 'LINEAR16',
              audioChannelCount: 2,
              languageCode: 'fil-PH'
            };
            audio = {
              uri: gcsUri
            };
            request = {
              config: config,
              audio: audio
            };

            // Detects speech in the audio file

            _context.next = 6;
            return client.longRunningRecognize(request);

          case 6:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 1);
            operation = _ref5[0];
            _context.next = 11;
            return operation.promise();

          case 11:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 1);
            response = _ref7[0];
            transcription = response.results.map(function (result) {
              return result.alternatives[0].transcript;
            }).join('\n');
            _context.next = 17;
            return transcription;

          case 17:
            return _context.abrupt('return', _context.sent);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function extractText(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var extractDocumentText = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(inputPath) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function (resolve, reject) {
              _textract2.default.fromFileWithPath(inputPath, {
                preserveLineBreaks: true
              }, function (error, text) {
                if (error) {
                  reject();
                } else {
                  resolve(text);
                }
              });
            }).catch(function (err) {
              console.log(err);
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function extractDocumentText(_x2) {
    return _ref8.apply(this, arguments);
  };
}();

//retrieving file from GCS
var getFileFromGCS = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(filename, savePath, originalFilename) {
    var file, newFilename;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              file = bucket.file(filename);
              newFilename = originalFilename.split('.')[0] + '.' + filename.split('.')[1];


              file.download({
                destination: savePath + newFilename
              });
            } catch (err) {
              console.log(err);
            }

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getFileFromGCS(_x3, _x4, _x5) {
    return _ref9.apply(this, arguments);
  };
}();

exports.default = {
  renameFile: renameFile,
  storeUpload: storeUpload,
  translateText: translateText,
  uploadGCS: uploadGCS,
  extractText: extractText,
  extractDocumentText: extractDocumentText,
  convert: convert,
  getFileFromGCS: getFileFromGCS
};