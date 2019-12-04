const { mergeResolvers } = require('merge-graphql-schemas');
const clientResolver = require('./client');
const sessionResolver = require('./session');
const sessionDocumentResolver = require('./session_document');
const practitionerResolver = require('./practitioner');
const resultResolver = require('./result');

const resolvers = [
  clientResolver,
  sessionResolver,
  sessionDocumentResolver,
  practitionerResolver,
  resultResolver
];

module.exports = mergeResolvers(resolvers);
