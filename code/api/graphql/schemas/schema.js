import { mergeTypes } from 'merge-graphql-schemas';
import practitionerType from './practitioner';
import clientType from './client';
import sessionType from './session';
import sessiondocumentType from './session_document';

const typeDefs = [
  practitionerType,
  clientType,
  sessionType,
  sessiondocumentType
];

export default mergeTypes(typeDefs, { all: true });
