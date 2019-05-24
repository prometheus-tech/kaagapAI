'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTypeUuid = require('graphql-type-uuid');

var _graphqlTypeUuid2 = _interopRequireDefault(_graphqlTypeUuid);

var _upload_modules = require('../../modules/upload_modules');

var _upload_modules2 = _interopRequireDefault(_upload_modules);

var _downloadsFolder = require('downloads-folder');

var _downloadsFolder2 = _interopRequireDefault(_downloadsFolder);

var _document_modules = require('../../modules/document_modules');

var _document_modules2 = _interopRequireDefault(_document_modules);

var _apolloServerExpress = require('apollo-server-express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  UUID: _graphqlTypeUuid2.default,

  Query: {
    sessionDocument: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref2, _ref3) {
        var sd_id = _ref2.sd_id;
        var models = _ref3.models,
            practitioner = _ref3.practitioner;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (practitioner) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                _context.next = 6;
                return models.Session_Document.findOne({
                  raw: true,
                  where: { sd_id: sd_id }
                });

              case 6:
                return _context.abrupt('return', _context.sent);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function sessionDocument(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }(),

    downloadSessionDocument: function downloadSessionDocument(parent, _ref4, _ref5) {
      var sd_id = _ref4.sd_id;
      var models = _ref5.models,
          practitioner = _ref5.practitioner;

      if (!practitioner) {
        throw new _apolloServerExpress.AuthenticationError('You must be logged in');
      } else {
        models.Session_Document.findOne({
          raw: true,
          where: { sd_id: sd_id }
        }).then(function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
            var filename, originalFilename, savePath;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    filename = res.file.split('gs://kaagapai-uploads/')[1];
                    originalFilename = res.file_name;
                    savePath = (0, _downloadsFolder2.default)() + '/';
                    _context2.next = 5;
                    return _document_modules2.default.getFileFromGCS(filename, savePath, originalFilename);

                  case 5:
                    return _context2.abrupt('return', res);

                  case 6:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          return function (_x4) {
            return _ref6.apply(this, arguments);
          };
        }());
      }
    }
  },

  Mutation: {
    uploadSessionDocument: function uploadSessionDocument(parent, _ref7, _ref8) {
      var file = _ref7.file,
          session_id = _ref7.session_id;
      var models = _ref8.models,
          practitioner = _ref8.practitioner;

      if (!practitioner) {
        throw new _apolloServerExpress.AuthenticationError('You must be logged in');
      } else {
        return _upload_modules2.default.uploadFile(file, session_id).then(function () {
          var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref10) {
            var session_id = _ref10.session_id,
                fileName = _ref10.fileName,
                filePath = _ref10.filePath,
                translation = _ref10.translation,
                mimetype = _ref10.mimetype;
            var addFileRes, sd_id;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return models.Session_Document.create({
                      session_id: session_id,
                      file: filePath,
                      file_name: fileName,
                      content: translation,
                      type: mimetype,
                      date_added: new Date()
                    });

                  case 2:
                    addFileRes = _context3.sent;
                    sd_id = addFileRes.dataValues.sd_id;
                    return _context3.abrupt('return', sd_id);

                  case 5:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined);
          }));

          return function (_x5) {
            return _ref9.apply(this, arguments);
          };
        }()).then(function () {
          var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sd_id) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return models.Result.destroy({ where: { session_id: session_id } });

                  case 2:
                    return _context4.abrupt('return', models.Session_Document.findOne({
                      raw: true,
                      where: { sd_id: sd_id }
                    }));

                  case 3:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, undefined);
          }));

          return function (_x6) {
            return _ref11.apply(this, arguments);
          };
        }());
      }
    },

    editSessionDocument: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, _ref13, _ref14) {
        var content = _ref13.content,
            sd_id = _ref13.sd_id,
            file_name = _ref13.file_name;
        var models = _ref14.models,
            practitioner = _ref14.practitioner;
        var sessionDocument;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (practitioner) {
                  _context5.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                _context5.next = 6;
                return models.Session_Document.update({
                  content: content,
                  last_modified: new Date(),
                  file_name: file_name
                }, {
                  where: { sd_id: sd_id }
                });

              case 6:
                _context5.next = 8;
                return models.Session_Document.findOne({
                  raw: true,
                  where: { sd_id: sd_id }
                });

              case 8:
                sessionDocument = _context5.sent;
                _context5.next = 11;
                return models.Result.destroy({ where: { session_id: sessionDocument.session_id } });

              case 11:
                return _context5.abrupt('return', sessionDocument);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function editSessionDocument(_x7, _x8, _x9) {
        return _ref12.apply(this, arguments);
      };
    }(),

    deleteSessionDocument: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref16, _ref17) {
        var sd_id = _ref16.sd_id;
        var models = _ref17.models,
            practitioner = _ref17.practitioner;
        var sessionDocument;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (practitioner) {
                  _context6.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                _context6.next = 6;
                return models.Session_Document.update({
                  status: "archived"
                }, {
                  where: { sd_id: sd_id }
                });

              case 6:
                _context6.next = 8;
                return models.Session_Document.findOne({
                  raw: true,
                  where: { sd_id: sd_id }
                });

              case 8:
                sessionDocument = _context6.sent;
                _context6.next = 11;
                return models.Result.destroy({ where: { session_id: sessionDocument.session_id } });

              case 11:
                return _context6.abrupt('return', sessionDocument);

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function deleteSessionDocument(_x10, _x11, _x12) {
        return _ref15.apply(this, arguments);
      };
    }(),

    restoreSessionDocument: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, _ref19, _ref20) {
        var sd_id = _ref19.sd_id;
        var models = _ref20.models,
            practitioner = _ref20.practitioner;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (practitioner) {
                  _context8.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                return _context8.abrupt('return', models.Session_Document.findOne({
                  raw: true,
                  where: { sd_id: sd_id }
                }).then(function (res) {
                  if (!res) {
                    throw new _apolloServerExpress.ForbiddenError('Session Document does not exist');
                  } else {
                    return models.Session.findOne({
                      raw: true,
                      where: { session_id: res.session_id }
                    });
                  }
                }).then(function () {
                  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(res) {
                    var sessionDocument;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!(res.status == 'archived')) {
                              _context7.next = 4;
                              break;
                            }

                            throw new _apolloServerExpress.ForbiddenError('Session has been deleted, please restore session folder first.');

                          case 4:
                            _context7.next = 6;
                            return models.Session_Document.update({
                              status: "active"
                            }, {
                              where: { sd_id: sd_id }
                            });

                          case 6:
                            _context7.next = 8;
                            return models.Session_Document.findOne({
                              raw: true,
                              where: { sd_id: sd_id }
                            });

                          case 8:
                            sessionDocument = _context7.sent;
                            _context7.next = 11;
                            return models.Result.destroy({ where: { session_id: sessionDocument.session_id } });

                          case 11:
                            return _context7.abrupt('return', sessionDocument);

                          case 12:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, undefined);
                  }));

                  return function (_x16) {
                    return _ref21.apply(this, arguments);
                  };
                }()));

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      return function restoreSessionDocument(_x13, _x14, _x15) {
        return _ref18.apply(this, arguments);
      };
    }()
  }
};