const { buildSchema } = require('graphql');
const { mergeTypes } = require('merge-graphql-schemas');
const practitionerType = require('./practitioner');
const clientType = require('./client');
const sessionType = require('./session');
const sessiondocumentType = require('./session_document');

const typeDefs = [
  practitionerType,
  clientType,
  sessionType,
  sessiondocumentType
];

module.exports = buildSchema(mergeTypes(typeDefs, { all: true }));