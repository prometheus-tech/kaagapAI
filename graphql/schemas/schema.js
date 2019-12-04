const { mergeTypes } = require('merge-graphql-schemas');
const practitionerType = require('./practitioner');
const clientType = require('./client');
const sessionType = require('./session');
const sessiondocumentType = require('./session_document');
const resultType = require('./result');

const typeDefs = [
  practitionerType,
  clientType,
  sessionType,
  sessiondocumentType,
  resultType
];

module.exports = mergeTypes(typeDefs, { all: true });
