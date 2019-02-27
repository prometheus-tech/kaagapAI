const { mergeResolvers } = require('merge-graphql-schemas');
const clientResolver = require('./client');
const sessionResolver = require('./session');

const resolvers = [
  clientResolver,
  sessionResolver
]

module.exports = mergeResolvers(resolvers);