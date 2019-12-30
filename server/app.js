require('dotenv').config();

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/schemas/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const models = require('./models');
const auth = require('./modules/auth');
const cors = require('cors');
const http = require('http');
const path = require('path');

// Change to production on deploy
const environment = process.env.NODE_ENV || 'development';

const SECRET = process.env.JWT_SECRET;

const apollo = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  formatError: error => {
    delete error.extensions.exception;
    return error;
  },
  context: ({ req }) => ({
    models,
    SECRET,
    practitioner: auth.getPractitioner(req, SECRET)
  }),
  playground: process.env.NODE_ENV === 'development',
  introspection: true
});

const app = express();
app.use(cors());

if (environment !== 'development') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

apollo.applyMiddleware({ app });

const server = http.createServer(app);

models.sequelize
  .sync()
  .then(res => {
    server.listen({ port: process.env.PORT || 4000 }, () => {
      console.log('🚀 Server ready');
    });
  })
  .catch(err => {
    console.log('Something wrong with the server: ' + err);
  });
