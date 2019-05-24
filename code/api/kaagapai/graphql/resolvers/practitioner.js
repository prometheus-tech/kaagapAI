'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTypeUuid = require('graphql-type-uuid');

var _graphqlTypeUuid2 = _interopRequireDefault(_graphqlTypeUuid);

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _auth = require('../../modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _registration = require('../../modules/registration');

var _registration2 = _interopRequireDefault(_registration);

var _apolloServerExpress = require('apollo-server-express');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  UUID: _graphqlTypeUuid2.default,
  JSON: _graphqlTypeJson2.default,

  Archives: {},

  Query: {
    profile: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref2) {
        var models = _ref2.models,
            practitioner = _ref2.practitioner;
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
                return models.Practitioner.findOne({
                  raw: true,
                  where: { p_id: practitioner },
                  attributes: ['email', 'fname', 'lname', 'phone_no', 'license', 'profession', 'date_registered', 'last_logged']
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

      return function profile(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }(),

    archives: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref4) {
        var models = _ref4.models,
            practitioner = _ref4.practitioner;
        var Op, clientArchives, sessionArchives, clientsActive, sessionsActive, sessionDocumentsArchives;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (practitioner) {
                  _context4.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                Op = _sequelize2.default.Op;
                clientArchives = [];
                sessionArchives = [];
                _context4.next = 9;
                return models.Client.findAll({
                  raw: true,
                  where: { p_id: practitioner }
                }).then(function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clients) {
                    var clientActive;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            clientActive = [];

                            clients.forEach(function (client) {
                              if (client.status == 'archived') {
                                clientArchives.push(client);
                              } else {
                                clientActive.push(client.c_id);
                              }
                            });
                            return _context2.abrupt('return', clientActive);

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, undefined);
                  }));

                  return function (_x7) {
                    return _ref5.apply(this, arguments);
                  };
                }());

              case 9:
                clientsActive = _context4.sent;
                _context4.next = 12;
                return models.Session.findAll({
                  raw: true,
                  where: {
                    c_id: _defineProperty({}, Op.in, clientsActive)
                  }
                }).then(function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sessions) {
                    var sessionActive;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            sessionActive = [];

                            sessions.forEach(function (session) {
                              if (session.status == 'archived') {
                                sessionArchives.push(session);
                              } else {
                                sessionActive.push(session.session_id);
                              }
                            });
                            return _context3.abrupt('return', sessionActive);

                          case 3:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, undefined);
                  }));

                  return function (_x8) {
                    return _ref6.apply(this, arguments);
                  };
                }());

              case 12:
                sessionsActive = _context4.sent;
                _context4.next = 15;
                return models.Session_Document.findAll({
                  raw: true,
                  where: {
                    session_id: _defineProperty({}, Op.in, sessionsActive),
                    status: 'archived'
                  }
                });

              case 15:
                sessionDocumentsArchives = _context4.sent;
                return _context4.abrupt('return', {
                  archives_id: (0, _v2.default)(),
                  clients: clientArchives,
                  sessions: sessionArchives,
                  session_documents: sessionDocumentsArchives
                });

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function archives(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  },

  Mutation: {
    login: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref8, _ref9) {
        var email = _ref8.email,
            password = _ref8.password;
        var models = _ref9.models,
            SECRET = _ref9.SECRET;
        var practitioner, session_token;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return models.Practitioner.findOne({
                  raw: true,
                  where: { email: email }
                }).then(function (practitioner) {
                  var _auth$verifyPractitio = _auth2.default.verifyPractitioner(practitioner),
                      errorMessage = _auth$verifyPractitio.errorMessage,
                      errorCode = _auth$verifyPractitio.errorCode;

                  if (!errorMessage) {
                    return practitioner;
                  } else {
                    throw new _apolloServerExpress.ApolloError(errorMessage, errorCode);
                  }
                }).then(function (practitioner) {
                  if (!_auth2.default.validateEmail(practitioner)) {
                    throw new _apolloServerExpress.ApolloError('Email is not yet registered', 'EMAIL_UNREGISTERED');
                  } else {
                    return practitioner;
                  }
                }).then(function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(practitioner) {
                    var validPassword;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _auth2.default.validatePassword({
                              password: password,
                              practitioner: practitioner
                            });

                          case 2:
                            validPassword = _context5.sent;

                            if (validPassword) {
                              _context5.next = 7;
                              break;
                            }

                            throw new _apolloServerExpress.ApolloError('Invalid password', 'INVALID_PASSWORD');

                          case 7:
                            return _context5.abrupt('return', practitioner);

                          case 8:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, undefined);
                  }));

                  return function (_x12) {
                    return _ref10.apply(this, arguments);
                  };
                }());

              case 2:
                practitioner = _context6.sent;
                _context6.next = 5;
                return models.Practitioner.update({
                  last_logged: new Date()
                }, {
                  where: { p_id: practitioner.p_id }
                });

              case 5:
                session_token = _auth2.default.generateToken(practitioner, SECRET);
                return _context6.abrupt('return', { session_token: session_token });

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function login(_x9, _x10, _x11) {
        return _ref7.apply(this, arguments);
      };
    }(),

    register: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, _ref12, _ref13) {
        var email = _ref12.email,
            password = _ref12.password,
            phone_no = _ref12.phone_no,
            fname = _ref12.fname,
            lname = _ref12.lname,
            license = _ref12.license,
            profession = _ref12.profession;
        var models = _ref13.models;
        var existingPractitioner, verificationCode, body, subject, hashPassword;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return models.Practitioner.findOne({
                  raw: true,
                  where: { email: email }
                });

              case 2:
                existingPractitioner = _context7.sent;
                verificationCode = null;
                body = 'To verify your email, please enter the following verification code: ';
                subject = 'Email verification';
                hashPassword = null;

                if (existingPractitioner) {
                  _context7.next = 21;
                  break;
                }

                verificationCode = _registration2.default.generateCode().toString();
                body = body + verificationCode;
                _context7.next = 12;
                return _registration2.default.hashPassword(password);

              case 12:
                hashPassword = _context7.sent;
                _context7.next = 15;
                return _registration2.default.sendEmail(subject, body, email);

              case 15:
                if (!_context7.sent) {
                  _context7.next = 19;
                  break;
                }

                _context7.next = 18;
                return models.Practitioner.create({
                  email: email,
                  phone_no: phone_no,
                  password: hashPassword,
                  fname: fname,
                  lname: lname,
                  license: license,
                  profession: profession,
                  date_registered: new Date(),
                  verification_code: verificationCode
                });

              case 18:
                return _context7.abrupt('return', { email: email });

              case 19:
                _context7.next = 36;
                break;

              case 21:
                if (!(existingPractitioner.user_status == 'active')) {
                  _context7.next = 25;
                  break;
                }

                throw new _apolloServerExpress.ApolloError('Email is already in use', 'USER_ALREADY_EXISTS');

              case 25:
                verificationCode = _registration2.default.generateCode().toString();
                body = body + verificationCode;
                _context7.next = 29;
                return _registration2.default.hashPassword(password);

              case 29:
                hashPassword = _context7.sent;
                _context7.next = 32;
                return _registration2.default.sendEmail(subject, body, email);

              case 32:
                if (!_context7.sent) {
                  _context7.next = 36;
                  break;
                }

                _context7.next = 35;
                return models.Practitioner.update({
                  phone_no: phone_no,
                  password: hashPassword,
                  fname: fname,
                  lname: lname,
                  license: license,
                  profession: profession,
                  verification_code: verificationCode
                }, {
                  where: { email: email }
                });

              case 35:
                return _context7.abrupt('return', { email: email });

              case 36:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function register(_x13, _x14, _x15) {
        return _ref11.apply(this, arguments);
      };
    }(),

    verifyRegistration: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, _ref15, _ref16) {
        var email = _ref15.email,
            input_code = _ref15.input_code;
        var models = _ref16.models;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt('return', models.Practitioner.findOne({
                  raw: true,
                  where: { email: email }
                }).then(function (res) {
                  var verificationCode = res.verification_code;

                  return _registration2.default.verifyCode(input_code, verificationCode);
                }).then(function () {
                  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(res) {
                    var body, subject;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!res) {
                              _context8.next = 10;
                              break;
                            }

                            _context8.next = 3;
                            return models.Practitioner.update({
                              verification_code: 'verified',
                              user_status: 'active'
                            }, {
                              where: { email: email }
                            });

                          case 3:
                            body = "Your account has been successfully verified! Please log in to continue";
                            subject = 'Account Verified';
                            _context8.next = 7;
                            return _registration2.default.sendEmail(subject, body, email);

                          case 7:
                            return _context8.abrupt('return', { email: email });

                          case 10:
                            throw new _apolloServerExpress.ApolloError('Invalid Verification Code', 'INVALID_VERIFICATION_CODE');

                          case 11:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, undefined);
                  }));

                  return function (_x19) {
                    return _ref17.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      return function verifyRegistration(_x16, _x17, _x18) {
        return _ref14.apply(this, arguments);
      };
    }(),

    updateProfile: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(parent, _ref19, _ref20) {
        var email = _ref19.email,
            password = _ref19.password,
            phone_no = _ref19.phone_no,
            fname = _ref19.fname,
            lname = _ref19.lname;
        var models = _ref20.models,
            practitioner = _ref20.practitioner;
        var Op, existingPractitioner, hashPassword;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                Op = _sequelize2.default.Op;
                _context11.next = 3;
                return models.Practitioner.findOne({
                  where: {
                    email: email,
                    p_id: _defineProperty({}, Op.ne, practitioner)
                  }
                });

              case 3:
                existingPractitioner = _context11.sent;

                if (practitioner) {
                  _context11.next = 8;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 8:
                if (!existingPractitioner) {
                  _context11.next = 12;
                  break;
                }

                throw new _apolloServerExpress.ApolloError('Email is already in use', 'USER_ALREADY_EXISTS');

              case 12:
                _context11.next = 14;
                return _registration2.default.hashPassword(password);

              case 14:
                hashPassword = _context11.sent;
                return _context11.abrupt('return', models.Practitioner.update({
                  email: email,
                  password: hashPassword,
                  phone_no: phone_no,
                  fname: fname,
                  lname: lname
                }, {
                  where: { p_id: practitioner }
                }).then(function () {
                  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(res) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return models.Practitioner.findOne({
                              raw: true,
                              where: { p_id: practitioner },
                              attributes: ['email', 'fname', 'lname', 'phone_no', 'license', 'profession', 'date_registered', 'last_logged']
                            });

                          case 2:
                            return _context10.abrupt('return', _context10.sent);

                          case 3:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, undefined);
                  }));

                  return function (_x23) {
                    return _ref21.apply(this, arguments);
                  };
                }()));

              case 16:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      }));

      return function updateProfile(_x20, _x21, _x22) {
        return _ref18.apply(this, arguments);
      };
    }(),

    forgotPassword: function () {
      var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(parent, _ref23, _ref24) {
        var email = _ref23.email;
        var models = _ref24.models;
        var changePasswordUUID, body, subject;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                changePasswordUUID = (0, _v2.default)();
                //change body base on final url

                body = 'To change your password please click on the link: kaagapai-dev.com/forgotpassword/' + changePasswordUUID;
                subject = 'Change Account Password';
                return _context13.abrupt('return', models.Practitioner.findOne({
                  raw: true,
                  where: {
                    email: email,
                    user_status: 'active'
                  },
                  attributes: ['email']
                }).then(function () {
                  var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(res) {
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            if (res) {
                              _context12.next = 4;
                              break;
                            }

                            throw new _apolloServerExpress.ApolloError('Email is not yet registered', 'EMAIL_UNREGISTERED');

                          case 4:
                            _context12.next = 6;
                            return _registration2.default.sendEmail(subject, body, email);

                          case 6:
                            if (!_context12.sent) {
                              _context12.next = 12;
                              break;
                            }

                            _context12.next = 9;
                            return models.Practitioner.update({
                              change_password_UUID: changePasswordUUID
                            }, {
                              where: { email: email }
                            });

                          case 9:
                            _context12.next = 11;
                            return models.Practitioner.findOne({
                              raw: true,
                              where: {
                                email: email,
                                user_status: 'active'
                              },
                              attributes: ['email']
                            });

                          case 11:
                            return _context12.abrupt('return', _context12.sent);

                          case 12:
                          case 'end':
                            return _context12.stop();
                        }
                      }
                    }, _callee12, undefined);
                  }));

                  return function (_x27) {
                    return _ref25.apply(this, arguments);
                  };
                }()));

              case 4:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, undefined);
      }));

      return function forgotPassword(_x24, _x25, _x26) {
        return _ref22.apply(this, arguments);
      };
    }(),

    changePassword: function () {
      var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(parent, _ref27, _ref28) {
        var changePasswordToken = _ref27.changePasswordToken,
            email = _ref27.email,
            password = _ref27.password;
        var models = _ref28.models;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return models.Practitioner.findOne({
                  raw: true,
                  where: { email: email }
                }).then(function () {
                  var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(res) {
                    var hashPassword, body, subject;
                    return regeneratorRuntime.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            if (!(res.change_password_UUID == changePasswordToken)) {
                              _context15.next = 11;
                              break;
                            }

                            _context15.next = 3;
                            return _registration2.default.hashPassword(password);

                          case 3:
                            hashPassword = _context15.sent;


                            //link to be changed
                            body = 'Your account password has been successfully changed. Please click the link to login: kaagapai-dev.com/login';
                            subject = 'Password Successfully Changed';
                            _context15.next = 8;
                            return models.Practitioner.update({
                              password: hashPassword,
                              change_password_UUID: null
                            }, {
                              where: { email: email }
                            }).then(function () {
                              var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(res) {
                                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                                  while (1) {
                                    switch (_context14.prev = _context14.next) {
                                      case 0:
                                        _context14.next = 2;
                                        return _registration2.default.sendEmail(subject, body, email);

                                      case 2:
                                        return _context14.abrupt('return', _context14.sent);

                                      case 3:
                                      case 'end':
                                        return _context14.stop();
                                    }
                                  }
                                }, _callee14, undefined);
                              }));

                              return function (_x32) {
                                return _ref30.apply(this, arguments);
                              };
                            }());

                          case 8:
                            return _context15.abrupt('return', { email: email });

                          case 11:
                            throw new _apolloServerExpress.ForbiddenError('Invalid change password token');

                          case 12:
                          case 'end':
                            return _context15.stop();
                        }
                      }
                    }, _callee15, undefined);
                  }));

                  return function (_x31) {
                    return _ref29.apply(this, arguments);
                  };
                }());

              case 2:
                return _context16.abrupt('return', _context16.sent);

              case 3:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, undefined);
      }));

      return function changePassword(_x28, _x29, _x30) {
        return _ref26.apply(this, arguments);
      };
    }()
  }
};