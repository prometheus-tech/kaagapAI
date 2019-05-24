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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  UUID: _graphqlTypeUuid2.default,

  Client: {
    sessions: function sessions(_ref, args, _ref2) {
      var c_id = _ref.c_id;
      var models = _ref2.models;

      if (!args.orderByInput || !args.orderByColumn) {
        args.orderByColumn = 'session_name';
        args.orderByInput = 'ASC';
      }

      return models.Session.findAll({
        where: {
          c_id: c_id,
          status: 'active'
        },
        order: [[args.orderByColumn, args.orderByInput]]
      });
    },

    no_of_sessions: function no_of_sessions(_ref3, args, _ref4) {
      var c_id = _ref3.c_id;
      var models = _ref4.models;

      return models.Session.count({
        where: {
          c_id: c_id,
          status: 'active'
        }
      });
    },

    searchsession: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref6, args, _ref7) {
        var c_id = _ref6.c_id;
        var models = _ref7.models;
        var Op;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Op = _sequelize2.default.Op;
                return _context.abrupt('return', models.Session.findAll({
                  where: {
                    c_id: c_id,
                    session_name: _defineProperty({}, Op.like, args.filter)
                  }
                }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function searchsession(_x, _x2, _x3) {
        return _ref5.apply(this, arguments);
      };
    }()
  },

  Query: {
    clients: function clients(parent, args, _ref8) {
      var models = _ref8.models,
          practitioner = _ref8.practitioner;

      if (!practitioner) {
        throw new _apolloServerExpress.AuthenticationError('You must be logged in');
      } else {
        if (!args.orderByInput || !args.orderByColumn) {
          args.orderByColumn = 'lname';
          args.orderByInput = 'ASC';
        }

        return models.Client.findAll({
          raw: true,
          where: {
            p_id: practitioner,
            status: 'active'
          },
          order: [[args.orderByColumn, args.orderByInput]]
        });
      }
    },

    client: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref10, _ref11) {
        var c_id = _ref10.c_id;
        var models = _ref11.models,
            practitioner = _ref11.practitioner;
        var client;
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
                return models.Client.findOne({
                  where: {
                    c_id: c_id,
                    p_id: practitioner
                  }
                });

              case 6:
                client = _context2.sent;

                if (client) {
                  _context2.next = 11;
                  break;
                }

                throw new _apolloServerExpress.ForbiddenError('Unauthorized Access');

              case 11:
                _context2.next = 13;
                return models.Client.update({
                  last_opened: new Date()
                }, {
                  where: { c_id: c_id }
                });

              case 13:
                return _context2.abrupt('return', client);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function client(_x4, _x5, _x6) {
        return _ref9.apply(this, arguments);
      };
    }(),

    searchclients: function searchclients(parent, _ref12, _ref13) {
      var name = _ref12.name;
      var models = _ref13.models,
          practitioner = _ref13.practitioner;

      if (!practitioner) {
        throw new _apolloServerExpress.AuthenticationError('You must be logged in');
      } else {
        var filter = name.split(" ");
        var Op = _sequelize2.default.Op;
        return models.Client.findAll({
          raw: true,
          where: {
            p_id: practitioner,
            status: 'active',
            fname: _defineProperty({}, Op.like, filter[0]),
            lname: _defineProperty({}, Op.like, filter[filter.length - 1])
          }
        });
      }
    }
  },

  Mutation: {
    addClient: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref15, _ref16) {
        var fname = _ref15.fname,
            lname = _ref15.lname,
            gender = _ref15.gender,
            birthdate = _ref15.birthdate;
        var models = _ref16.models,
            practitioner = _ref16.practitioner;
        var addClientRes, c_id;
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
                return models.Client.create({
                  fname: fname,
                  lname: lname,
                  gender: gender,
                  birthdate: birthdate,
                  p_id: practitioner,
                  date_added: new Date()
                });

              case 6:
                addClientRes = _context3.sent;
                c_id = addClientRes.dataValues.c_id;
                _context3.next = 10;
                return models.Client.findOne({
                  raw: true,
                  where: { c_id: c_id }
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

      return function addClient(_x7, _x8, _x9) {
        return _ref14.apply(this, arguments);
      };
    }(),

    deleteClient: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, _ref18, _ref19) {
        var c_id = _ref18.c_id;
        var models = _ref19.models,
            practitioner = _ref19.practitioner;
        var client;
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
                _context4.next = 6;
                return models.Client.findOne({
                  where: {
                    c_id: c_id,
                    p_id: practitioner
                  }
                });

              case 6:
                client = _context4.sent;

                if (client) {
                  _context4.next = 11;
                  break;
                }

                throw new _apolloServerExpress.ForbiddenError('Unauthorized Access');

              case 11:
                _context4.next = 13;
                return models.Client.update({
                  status: "archived"
                }, {
                  where: { c_id: c_id }
                });

              case 13:
                _context4.next = 15;
                return models.Session.update({
                  status: "archived"
                }, {
                  where: { c_id: c_id }
                });

              case 15:
                _context4.next = 17;
                return models.Session.findAll({
                  where: { c_id: c_id },
                  attributes: ["session_id"]
                }).then(function (res) {
                  res.forEach(function (element) {
                    var id = element.dataValues.session_id;

                    models.Session_Document.update({
                      status: "archived"
                    }, {
                      where: { session_id: id }
                    });
                  });
                });

              case 17:
                _context4.next = 19;
                return models.Client.findOne({
                  raw: true,
                  where: { c_id: c_id }
                });

              case 19:
                return _context4.abrupt('return', _context4.sent);

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function deleteClient(_x10, _x11, _x12) {
        return _ref17.apply(this, arguments);
      };
    }(),

    restoreClient: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, _ref21, _ref22) {
        var c_id = _ref21.c_id;
        var models = _ref22.models,
            practitioner = _ref22.practitioner;
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
                return models.Client.update({
                  status: "active"
                }, {
                  where: { c_id: c_id }
                });

              case 6:
                _context5.next = 8;
                return models.Session.update({
                  status: "active"
                }, {
                  where: { c_id: c_id }
                });

              case 8:
                _context5.next = 10;
                return models.Session.findAll({
                  where: { c_id: c_id },
                  attributes: ["session_id"]
                }).then(function (res) {
                  res.forEach(function (element) {
                    var id = element.dataValues.session_id;

                    models.Session_Document.update({
                      status: "active"
                    }, {
                      where: { session_id: id }
                    });
                  });
                });

              case 10:
                _context5.next = 12;
                return models.Client.findOne({
                  raw: true,
                  where: { c_id: c_id }
                });

              case 12:
                return _context5.abrupt('return', _context5.sent);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function restoreClient(_x13, _x14, _x15) {
        return _ref20.apply(this, arguments);
      };
    }(),

    updateClientInformation: function () {
      var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref24, _ref25) {
        var c_id = _ref24.c_id,
            fname = _ref24.fname,
            lname = _ref24.lname,
            birthdate = _ref24.birthdate,
            gender = _ref24.gender;
        var models = _ref25.models,
            practitioner = _ref25.practitioner;
        var client;
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
                return models.Client.findOne({
                  where: {
                    c_id: c_id,
                    p_id: practitioner
                  }
                });

              case 6:
                client = _context6.sent;

                if (client) {
                  _context6.next = 11;
                  break;
                }

                throw new _apolloServerExpress.ForbiddenError('Unauthorized Access');

              case 11:
                _context6.next = 13;
                return models.Client.update({
                  fname: fname,
                  lname: lname,
                  birthdate: birthdate,
                  gender: gender
                }, {
                  where: { c_id: c_id }
                });

              case 13:
                _context6.next = 15;
                return models.Client.findOne({
                  raw: true,
                  where: { c_id: c_id }
                });

              case 15:
                return _context6.abrupt('return', _context6.sent);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function updateClientInformation(_x16, _x17, _x18) {
        return _ref23.apply(this, arguments);
      };
    }()
  }
};