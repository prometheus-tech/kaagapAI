import { mergeTypes } from 'merge-graphql-schemas';
import practitionerType from './practitioner';
import clientType from './client';
import sessionType from './session';
import sessiondocumentType from './session_document';
import resultType from './result';
import sentimentType from './sentiment';
import keywordType from './keyword';
import categoryType from './category';
import entityType from './entity';
import emotionType from './emotion';

const typeDefs = [
  practitionerType,
  clientType,
  sessionType,
  sessiondocumentType,
  resultType,
  sentimentType,
  keywordType,
  categoryType,
  entityType,
  emotionType
];

export default mergeTypes(typeDefs, { all: true });
