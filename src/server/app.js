require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const http = require('http');

const auth = require('./modules/auth');
const models = require('./models');
const path = require('path');
const resolvers = require('./graphql/resolvers/resolvers');
const typeDefs = require('./graphql/schemas/schema');

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

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

apollo.applyMiddleware({ app });

const server = http.createServer(app);

models.sequelize
  .sync()
  .then(() => {
    server.listen({ port: process.env.PORT || 4000 }, () => {
      console.log('🚀 Server ready');
    });
  })
  .catch(err => {
    console.log('Database connection error', err);
  });
