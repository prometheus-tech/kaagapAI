'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTypeUuid = require('graphql-type-uuid');

var _graphqlTypeUuid2 = _interopRequireDefault(_graphqlTypeUuid);

var _apolloServerExpress = require('apollo-server-express');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  UUID: _graphqlTypeUuid2.default,

  Session: {
    documents: function documents(_ref, args, _ref2) {
      var session_id = _ref.session_id;
      var models = _ref2.models;

      if (!args.orderByInput || !args.orderByColumn) {
        args.orderByColumn = 'file_name';
        args.orderByInput = 'ASC';
      }

      return models.Session_Document.findAll({
        where: {
          session_id: session_id,
          status: 'active'
        },
        order: [[args.orderByColumn, args.orderByInput]]
      });
    },

    searchdocument: function searchdocument(_ref3, args, _ref4) {
      var session_id = _ref3.session_id;
      var models = _ref4.models;

      var Op = _sequelize2.default.Op;
      return models.Session_Document.findAll({
        where: {
          session_id: session_id,
          status: 'active',
          file_name: _defineProperty({}, Op.like, args.filter)
        }
      });
    }
  },

  Query: {
    session: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref6, _ref7) {
        var session_id = _ref6.session_id;
        var models = _ref7.models,
            practitioner = _ref7.practitioner;
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
                return models.Session.findOne({ where: { session_id: session_id } });

              case 6:
                return _context.abrupt('return', _context.sent);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function session(_x, _x2, _x3) {
        return _ref5.apply(this, arguments);
      };
    }()
  },

  Mutation: {
    addSession: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref9, _ref10) {
        var session_name = _ref9.session_name,
            date_of_session = _ref9.date_of_session,
            c_id = _ref9.c_id;
        var models = _ref10.models,
            practitioner = _ref10.practitioner;
        var addSessionRes, session_id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (practitioner) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                _context2.next = 6;
                return models.Session.create({
                  session_name: session_name,
                  date_of_session: date_of_session,
                  c_id: c_id
                });

              case 6:
                addSessionRes = _context2.sent;
                session_id = addSessionRes.dataValues.session_id;
                _context2.next = 10;
                return models.Session.findOne({
                  raw: true,
                  where: { session_id: session_id }
                });

              case 10:
                return _context2.abrupt('return', _context2.sent);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function addSession(_x4, _x5, _x6) {
        return _ref8.apply(this, arguments);
      };
    }(),

    deleteSession: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref12, _ref13) {
        var session_id = _ref12.session_id;
        var models = _ref13.models,
            practitioner = _ref13.practitioner;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (practitioner) {
                  _context3.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                _context3.next = 6;
                return models.Session.update({
                  status: "archived"
                }, {
                  where: { session_id: session_id }
                });

              case 6:
                _context3.next = 8;
                return models.Session_Document.update({
                  status: "archived"
                }, {
                  where: { session_id: session_id }
                });

              case 8:
                _context3.next = 10;
                return models.Session.findOne({
                  raw: true,
                  where: { session_id: session_id }
                });

              case 10:
                return _context3.abrupt('return', _context3.sent);

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function deleteSession(_x7, _x8, _x9) {
        return _ref11.apply(this, arguments);
      };
    }(),

    restoreSession: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, _ref15, _ref16) {
        var session_id = _ref15.session_id;
        var models = _ref16.models,
            practitioner = _ref16.practitioner;
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
                return _context5.abrupt('return', models.Session.findOne({
                  raw: true,
                  where: { session_id: session_id }
                }).then(function (res) {
                  if (!res) {
                    throw new _apolloServerExpress.ForbiddenError('Session does not exist');
                  } else {
                    return models.Client.findOne({
                      raw: true,
                      where: { c_id: res.c_id }
                    });
                  }
                }).then(function () {
                  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(res) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(res.status == 'archived')) {
                              _context4.next = 4;
                              break;
                            }

                            throw new _apolloServerExpress.ForbiddenError('Client has been deleted, please restore client first.');

                          case 4:
                            _context4.next = 6;
                            return models.Session.update({
                              status: "active"
                            }, {
                              where: { session_id: session_id }
                            });

                          case 6:
                            _context4.next = 8;
                            return models.Session_Document.update({
                              status: "active"
                            }, {
                              where: { session_id: session_id }
                            });

                          case 8:
                            _context4.next = 10;
                            return models.Session.findOne({
                              raw: true,
                              where: { session_id: session_id }
                            });

                          case 10:
                            return _context4.abrupt('return', _context4.sent);

                          case 11:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, undefined);
                  }));

                  return function (_x13) {
                    return _ref17.apply(this, arguments);
                  };
                }()));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function restoreSession(_x10, _x11, _x12) {
        return _ref14.apply(this, arguments);
      };
    }(),

    updateSessionInformation: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref19, _ref20) {
        var session_id = _ref19.session_id,
            session_name = _ref19.session_name,
            date_of_session = _ref19.date_of_session;
        var models = _ref20.models,
            practitioner = _ref20.practitioner;
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
                return models.Session.update({
                  session_name: session_name,
                  date_of_session: date_of_session
                }, {
                  where: { session_id: session_id }
                });

              case 6:
                _context6.next = 8;
                return models.Session.findOne({
                  raw: true,
                  where: { session_id: session_id }
                });

              case 8:
                return _context6.abrupt('return', _context6.sent);

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function updateSessionInformation(_x14, _x15, _x16) {
        return _ref18.apply(this, arguments);
      };
    }()
  }
};