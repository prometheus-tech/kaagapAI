const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');

const app = express();

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: resolver,
  graphiql: true //to be changed to false when in production
}));

models.sequelize
  .sync()
  .then(result => {
    app.listen(4000, () => {
      console.log('Server is running at port 4000');
    });
  })
  .catch(err => {
    console.log("Failed to run the server: " + err);
  })