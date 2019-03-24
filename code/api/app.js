import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schemas/schema';
import resolvers from './graphql/resolvers/resolvers';
import models from './models';
import cors from 'cors';

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { models }
});

const app = express();

app.use(cors());
server.applyMiddleware({ app });

models.sequelize
  .sync()
  .then(result => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('Server is running at port 4000');
    });
  })
  .catch(err => {
    console.log('Failed to run the server: ' + err);
  });
