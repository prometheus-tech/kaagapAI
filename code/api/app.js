import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schemas/schema';
import resolvers from './graphql/resolvers/resolvers';
import models from './models';
import cors from 'cors';
import http from 'http';

const configurations = {
  development: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.DB_HOST_DEV
  },
  test: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.DB_HOST_TEST
  },
  production: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.DB_HOST_PROD
  }
};

const environment = 'development'; // Change this Jessie
const config = configurations[environment];

const apollo = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { models }
});

const app = express();
app.use(cors());

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
    server.listen({ port: config.port }, () => {
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
