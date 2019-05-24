'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _session_document = require('./session_document');

var _session_document2 = _interopRequireDefault(_session_document);

var _practitioner = require('./practitioner');

var _practitioner2 = _interopRequireDefault(_practitioner);

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = [_client2.default, _session2.default, _session_document2.default, _practitioner2.default, _result2.default];

exports.default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);