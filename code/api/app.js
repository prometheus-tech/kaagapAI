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
  graphiql: true
}));

// app.use(
//   graphqlEndpoint, 
//   // bodyParser.json(), 
//   expressGraphQL({
//     schema, 
//     context: {
//       models
//     }
//   })
// );

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