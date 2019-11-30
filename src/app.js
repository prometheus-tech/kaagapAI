require('dotenv').config({ path: './.env' });
import '@babel/polyfill';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schemas/schema';
import resolvers from './graphql/resolvers/resolvers';
import models from './models';
import auth from './modules/auth';
import cors from 'cors';
import http from 'http';
import path from 'path';

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
