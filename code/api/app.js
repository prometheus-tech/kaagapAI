const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers')

const app = express();

const db = require('./config/database');

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: resolver,
  //graphiql: true
}));

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});