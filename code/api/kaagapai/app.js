'use strict';

require('@babel/polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _schema = require('./graphql/schemas/schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./graphql/resolvers/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _appconfig = require('./config/appconfig');

var _appconfig2 = _interopRequireDefault(_appconfig);

var _auth = require('./modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: './.env' });


var environment = 'development'; // change to prod on deploy
var config = _appconfig2.default[environment];

var SECRET = process.env.JWT_SECRET;

var apollo = new _apolloServerExpress.ApolloServer({
  typeDefs: (0, _apolloServerExpress.gql)(_schema2.default),
  resolvers: _resolvers2.default,
  formatError: function formatError(error) {
    delete error.extensions.exception;
    return error;
  },
  context: function context(_ref) {
    var req = _ref.req;
    return {
      models: _models2.default,
      SECRET: SECRET,
      practitioner: _auth2.default.getPractitioner(req, SECRET)
    };
  },
  playground: true, //change to 'false' on deploy
  introspection: true
});

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.use(_express2.default.static(_path2.default.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'build', 'index.html'));
});

apollo.applyMiddleware({ app: app });

var server;
if (config.ssl) {
  console.log('SSL not yet supported. Please refer to this link: https://www.apollographql.com/docs/apollo-server/essentials/server');
} else {
  server = _http2.default.createServer(app);
}

_models2.default.sequelize.sync().then(function (res) {
  server.listen({ port: process.env.PORT || 4000 }, function () {
    console.log('🚀  Server ready at', 'http' + (config.ssl ? 's' : '') + '://' + config.hostname + ':' + config.port + '/');
  });
}).catch(function (err) {
  console.log('Something wrong with the server: ' + err);
});