'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTypeUuid = require('graphql-type-uuid');

var _graphqlTypeUuid2 = _interopRequireDefault(_graphqlTypeUuid);

var _nlu = require('../../modules/nlu');

var _nlu2 = _interopRequireDefault(_nlu);

var _apolloServerExpress = require('apollo-server-express');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  UUID: _graphqlTypeUuid2.default,

  Result: {
    categories: function categories(_ref, args, _ref2) {
      var result_id = _ref.result_id;
      var models = _ref2.models;

      return models.Category.findAll({
        where: { result_id: result_id },
        order: [['score', 'DESC']]
      });
    },

    entities: function entities(_ref3, args, _ref4) {
      var result_id = _ref3.result_id;
      var models = _ref4.models;

      return models.Entity.findAll({
        where: { result_id: result_id },
        order: [['relevance', 'DESC']]
      });
    },

    emotions: function emotions(_ref5, args, _ref6) {
      var result_id = _ref5.result_id;
      var models = _ref6.models;

      return models.Emotion.findAll({
        where: { result_id: result_id }
      });
    },

    sentiment: function sentiment(_ref7, args, _ref8) {
      var result_id = _ref7.result_id;
      var models = _ref8.models;

      return models.Sentiment.findAll({
        where: { result_id: result_id }
      });
    },

    keywords: function keywords(_ref9, args, _ref10) {
      var result_id = _ref9.result_id;
      var models = _ref10.models;

      return models.Keyword.findAll({
        where: { result_id: result_id },
        order: [['count', 'DESC'], ['relevance', 'DESC']]
      });
    }
  },

  Query: {
    result: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, _ref12, _ref13) {
        var session_id = _ref12.session_id;
        var models = _ref13.models,
            practitioner = _ref13.practitioner;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (practitioner) {
                  _context7.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                return _context7.abrupt('return', models.Result.findOne({
                  where: { session_id: session_id },
                  order: [['date_generated', 'DESC']]
                }).then(function () {
                  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(res) {
                    var session, client;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (res) {
                              _context6.next = 4;
                              break;
                            }

                            return _context6.abrupt('return', models.Session_Document.findAll({
                              raw: true,
                              attributes: ['content'],
                              where: {
                                session_id: session_id,
                                status: 'active'
                              }
                            }).then(function () {
                              var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sessionDocuments) {
                                var contents, addResultRes, result_id;
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        if (!(sessionDocuments.length == 0)) {
                                          _context5.next = 4;
                                          break;
                                        }

                                        return _context5.abrupt('return', res);

                                      case 4:
                                        contents = [];
                                        _context5.next = 7;
                                        return sessionDocuments.forEach(function (sessionDocument) {
                                          contents.push(sessionDocument.content);
                                        });

                                      case 7:
                                        _context5.next = 9;
                                        return models.Result.create({
                                          date_generated: new Date(),
                                          session_id: session_id
                                        });

                                      case 9:
                                        addResultRes = _context5.sent;
                                        result_id = addResultRes.dataValues.result_id;
                                        _context5.next = 13;
                                        return _nlu2.default.analyzeContent(contents).then(function () {
                                          var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(response) {
                                            var keywordsRes, categoriesRes, entitiesRes;
                                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                              while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                  case 0:
                                                    _context4.next = 2;
                                                    return models.Sentiment.create({
                                                      score: response.sentiment.document.score,
                                                      label: response.sentiment.document.label,
                                                      result_id: result_id
                                                    });

                                                  case 2:

                                                    //store keywords to db
                                                    keywordsRes = response.keywords;


                                                    keywordsRes.forEach(function () {
                                                      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keywordRes) {
                                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                          while (1) {
                                                            switch (_context.prev = _context.next) {
                                                              case 0:
                                                                _context.next = 2;
                                                                return models.Keyword.create({
                                                                  text: keywordRes.text,
                                                                  relevance: keywordRes.relevance,
                                                                  count: keywordRes.count,
                                                                  result_id: result_id
                                                                });

                                                              case 2:
                                                              case 'end':
                                                                return _context.stop();
                                                            }
                                                          }
                                                        }, _callee, undefined);
                                                      }));

                                                      return function (_x7) {
                                                        return _ref17.apply(this, arguments);
                                                      };
                                                    }());

                                                    //store categories to db
                                                    categoriesRes = response.categories;


                                                    categoriesRes.forEach(function () {
                                                      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(categoryRes) {
                                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                          while (1) {
                                                            switch (_context2.prev = _context2.next) {
                                                              case 0:
                                                                _context2.next = 2;
                                                                return models.Category.create({
                                                                  score: categoryRes.score,
                                                                  label: categoryRes.label,
                                                                  result_id: result_id
                                                                });

                                                              case 2:
                                                              case 'end':
                                                                return _context2.stop();
                                                            }
                                                          }
                                                        }, _callee2, undefined);
                                                      }));

                                                      return function (_x8) {
                                                        return _ref18.apply(this, arguments);
                                                      };
                                                    }());

                                                    //store entities to db
                                                    entitiesRes = response.entities;


                                                    entitiesRes.forEach(function () {
                                                      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(entityRes) {
                                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                          while (1) {
                                                            switch (_context3.prev = _context3.next) {
                                                              case 0:
                                                                _context3.next = 2;
                                                                return models.Entity.create({
                                                                  type: entityRes.type,
                                                                  text: entityRes.text,
                                                                  relevance: entityRes.relevance,
                                                                  result_id: result_id
                                                                });

                                                              case 2:
                                                              case 'end':
                                                                return _context3.stop();
                                                            }
                                                          }
                                                        }, _callee3, undefined);
                                                      }));

                                                      return function (_x9) {
                                                        return _ref19.apply(this, arguments);
                                                      };
                                                    }());

                                                    //store emotions to db
                                                    _context4.next = 10;
                                                    return models.Emotion.create({
                                                      sadness: response.emotion.document.emotion.sadness,
                                                      anger: response.emotion.document.emotion.anger,
                                                      joy: response.emotion.document.emotion.joy,
                                                      fear: response.emotion.document.emotion.fear,
                                                      disgust: response.emotion.document.emotion.disgust,
                                                      result_id: result_id
                                                    });

                                                  case 10:
                                                    return _context4.abrupt('return', result_id);

                                                  case 11:
                                                  case 'end':
                                                    return _context4.stop();
                                                }
                                              }
                                            }, _callee4, undefined);
                                          }));

                                          return function (_x6) {
                                            return _ref16.apply(this, arguments);
                                          };
                                        }());

                                      case 13:
                                        _context5.next = 15;
                                        return models.Result.findOne({
                                          raw: true,
                                          where: { result_id: result_id }
                                        });

                                      case 15:
                                        return _context5.abrupt('return', _context5.sent);

                                      case 16:
                                      case 'end':
                                        return _context5.stop();
                                    }
                                  }
                                }, _callee5, undefined);
                              }));

                              return function (_x5) {
                                return _ref15.apply(this, arguments);
                              };
                            }()));

                          case 4:
                            _context6.next = 6;
                            return models.Session.findOne({
                              where: { session_id: res.session_id }
                            });

                          case 6:
                            session = _context6.sent;
                            _context6.next = 9;
                            return models.Client.findOne({
                              where: {
                                p_id: practitioner,
                                c_id: session.c_id
                              }
                            });

                          case 9:
                            client = _context6.sent;

                            if (client) {
                              _context6.next = 14;
                              break;
                            }

                            throw new _apolloServerExpress.ForbiddenError('Unauthorized Access');

                          case 14:
                            return _context6.abrupt('return', res);

                          case 15:
                          case 'end':
                            return _context6.stop();
                        }
                      }
                    }, _callee6, undefined);
                  }));

                  return function (_x4) {
                    return _ref14.apply(this, arguments);
                  };
                }()));

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function result(_x, _x2, _x3) {
        return _ref11.apply(this, arguments);
      };
    }(),

    customSessionResult: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(parent, args, _ref21) {
        var models = _ref21.models,
            practitioner = _ref21.practitioner;
        var Op, sessionDocuments, contents, result, customSentiment, keywords, customKeyword, categories, customCategory, entities, customEntity, customEmotion, trends, results;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (practitioner) {
                  _context11.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                Op = _sequelize2.default.Op;
                _context11.next = 7;
                return models.Session_Document.findAll({
                  raw: true,
                  where: {
                    session_id: _defineProperty({}, Op.in, args.session_id),
                    status: 'active'
                  }
                });

              case 7:
                sessionDocuments = _context11.sent;
                contents = [];

                sessionDocuments.forEach(function (document) {
                  contents.push(document.content);
                });

                _context11.next = 12;
                return _nlu2.default.analyzeContent(contents);

              case 12:
                result = _context11.sent;
                customSentiment = {
                  custom_sentiment_id: (0, _v2.default)(),
                  score: result.sentiment.document.score,
                  label: result.sentiment.document.label
                };
                keywords = result.keywords;
                customKeyword = [];

                keywords.forEach(function () {
                  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(keyword) {
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            customKeyword.push({
                              custom_keyword_id: (0, _v2.default)(),
                              text: keyword.text,
                              relevance: keyword.relevance,
                              count: keyword.count
                            });

                          case 1:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, undefined);
                  }));

                  return function (_x13) {
                    return _ref22.apply(this, arguments);
                  };
                }());

                categories = result.categories;
                customCategory = [];

                categories.forEach(function () {
                  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(category) {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            customCategory.push({
                              custom_category_id: (0, _v2.default)(),
                              score: category.score,
                              label: category.label
                            });

                          case 1:
                          case 'end':
                            return _context9.stop();
                        }
                      }
                    }, _callee9, undefined);
                  }));

                  return function (_x14) {
                    return _ref23.apply(this, arguments);
                  };
                }());

                entities = result.entities;
                customEntity = [];

                entities.forEach(function () {
                  var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(entity) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            customEntity.push({
                              custom_entity_id: (0, _v2.default)(),
                              type: entity.type,
                              text: entity.text,
                              relevance: entity.relevance
                            });

                          case 1:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, undefined);
                  }));

                  return function (_x15) {
                    return _ref24.apply(this, arguments);
                  };
                }());

                customEmotion = {
                  custom_emotion_id: (0, _v2.default)(),
                  sadness: result.emotion.document.emotion.sadness,
                  anger: result.emotion.document.emotion.anger,
                  joy: result.emotion.document.emotion.joy,
                  fear: result.emotion.document.emotion.fear,
                  disgust: result.emotion.document.emotion.disgust
                };
                trends = [];
                _context11.next = 27;
                return models.Result.findAll({
                  raw: true,
                  where: {
                    session_id: _defineProperty({}, Op.in, args.session_id)
                  }
                });

              case 27:
                results = _context11.sent;


                results.forEach(function (result) {
                  trends.push({
                    trend_id: (0, _v2.default)(),
                    session_id: result.session_id,
                    sentiment: models.Sentiment.findOne({
                      raw: true,
                      where: { result_id: result.result_id }
                    }),
                    emotion: models.Emotion.findOne({
                      raw: true,
                      where: { result_id: result.result_id }
                    })
                  });
                });

                return _context11.abrupt('return', {
                  custom_result_id: (0, _v2.default)(),
                  sentiment: customSentiment,
                  keywords: customKeyword,
                  categories: customCategory,
                  entities: customEntity,
                  emotion: customEmotion,
                  trend: trends
                });

              case 30:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      }));

      return function customSessionResult(_x10, _x11, _x12) {
        return _ref20.apply(this, arguments);
      };
    }(),

    customDocumentResult: function () {
      var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(parent, args, _ref26) {
        var models = _ref26.models,
            practitioner = _ref26.practitioner;
        var Op, sessionDocuments, contents, result, customSentiment, keywords, customKeyword, categories, customCategory, entities, customEntity, customEmotion;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (practitioner) {
                  _context15.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You must be logged in');

              case 4:
                Op = _sequelize2.default.Op;
                _context15.next = 7;
                return models.Session_Document.findAll({
                  raw: true,
                  where: {
                    sd_id: _defineProperty({}, Op.in, args.sd_id),
                    status: 'active'
                  }
                });

              case 7:
                sessionDocuments = _context15.sent;
                contents = [];

                sessionDocuments.forEach(function (document) {
                  contents.push(document.content);
                });

                _context15.next = 12;
                return _nlu2.default.analyzeContent(contents);

              case 12:
                result = _context15.sent;
                customSentiment = {
                  custom_sentiment_id: (0, _v2.default)(),
                  score: result.sentiment.document.score,
                  label: result.sentiment.document.label
                };
                keywords = result.keywords;
                customKeyword = [];

                keywords.forEach(function () {
                  var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(keyword) {
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            customKeyword.push({
                              custom_keyword_id: (0, _v2.default)(),
                              text: keyword.text,
                              relevance: keyword.relevance,
                              count: keyword.count
                            });

                          case 1:
                          case 'end':
                            return _context12.stop();
                        }
                      }
                    }, _callee12, undefined);
                  }));

                  return function (_x19) {
                    return _ref27.apply(this, arguments);
                  };
                }());

                categories = result.categories;
                customCategory = [];

                categories.forEach(function () {
                  var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(category) {
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            customCategory.push({
                              custom_category_id: (0, _v2.default)(),
                              score: category.score,
                              label: category.label
                            });

                          case 1:
                          case 'end':
                            return _context13.stop();
                        }
                      }
                    }, _callee13, undefined);
                  }));

                  return function (_x20) {
                    return _ref28.apply(this, arguments);
                  };
                }());

                entities = result.entities;
                customEntity = [];

                entities.forEach(function () {
                  var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(entity) {
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            customEntity.push({
                              custom_entity_id: (0, _v2.default)(),
                              type: entity.type,
                              text: entity.text,
                              relevance: entity.relevance
                            });

                          case 1:
                          case 'end':
                            return _context14.stop();
                        }
                      }
                    }, _callee14, undefined);
                  }));

                  return function (_x21) {
                    return _ref29.apply(this, arguments);
                  };
                }());

                customEmotion = {
                  custom_emotion_id: (0, _v2.default)(),
                  sadness: result.emotion.document.emotion.sadness,
                  anger: result.emotion.document.emotion.anger,
                  joy: result.emotion.document.emotion.joy,
                  fear: result.emotion.document.emotion.fear,
                  disgust: result.emotion.document.emotion.disgust
                };
                return _context15.abrupt('return', {
                  custom_result_id: (0, _v2.default)(),
                  sentiment: customSentiment,
                  keywords: customKeyword,
                  categories: customCategory,
                  entities: customEntity,
                  emotion: customEmotion
                });

              case 25:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, undefined);
      }));

      return function customDocumentResult(_x16, _x17, _x18) {
        return _ref25.apply(this, arguments);
      };
    }()
  }
};