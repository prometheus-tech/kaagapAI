const { mergeResolvers } = require('merge-graphql-schemas');
const clientResolver = require('./client');
const sessionResolver = require('./session');
const sessionDocumentResolver = require('./session_documents');

const resolvers = [
  clientResolver,
  sessionResolver,
  sessionDocumentResolver
]

module.exports = mergeResolvers(resolvers);