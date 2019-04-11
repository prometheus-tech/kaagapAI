import { mergeTypes } from 'merge-graphql-schemas';
import practitionerType from './practitioner';
import clientType from './client';
import sessionType from './session';
import sessiondocumentType from './session_document';
import resultType from './result';
import sentimentType from './sentiment';

const typeDefs = [
  practitionerType,
  clientType,
  sessionType,
  sessiondocumentType,
  resultType,
  sentimentType
];

export default mergeTypes(typeDefs, { all: true });
