require('dotenv').config({ path: './.env' });
import '@babel/polyfill';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schemas/schema';
import resolvers from './graphql/resolvers/resolvers';
import models from './models';
import configurations from './config/appconfig';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';

process.env.GOOGLE_APPLICATION_CREDENTIALS

const environment = 'development'; // change to prod on deploy
const config = configurations[environment];

const SECRET = process.env.JWT_SECRET;

const getPractitioner = async req => {
  const token = req.headers.authorization;
  try {
    const { practitioner } = await jwt.verify(token, SECRET);
    req.practitioner = practitioner;
  } catch (err) {
    // console.log(err);
    //throw new Error('You must be authenticated');
  }

  req.next();
};

const apollo = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  formatError: error => {
    return error.message;
  },
  context: ({ req }) => ({
    models,
    SECRET,
    practitioner: req.practitioner
  }),
  playground: true, //change to 'false' on deploy
  introspection: true
});

const app = express();
app.use(cors());
app.use(getPractitioner);

apollo.applyMiddleware({ app });

var server;
if (config.ssl) {
  console.log(
    'SSL not yet supported. Please refer to this link: https://www.apollographql.com/docs/apollo-server/essentials/server'
  );
} else {
  server = http.createServer(app);
}

models.sequelize
  .sync()
  .then(res => {
    server.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(
        '🚀  Server ready at',
        `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
          apollo.graphqlPath
        }`
      );
    });
  })
  .catch(err => {
    console.log('Failed to run the server: ' + err);
  });
