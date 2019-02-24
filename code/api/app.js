const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');
const models = require('./models');

const app = express();

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));

models.sequelize
  .sync()
  .then(result => {
    app.listen(3000, () => {
      console.log('Server is running at port 3000');
    });
  })
  .catch(err => {
    console.log("Failed to run the server: " + err);
  })