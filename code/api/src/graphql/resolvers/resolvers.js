import { mergeResolvers } from 'merge-graphql-schemas';
import clientResolver from './client';
import sessionResolver from './session';
import sessionDocumentResolver from './session_document';
import practitionerResolver from './practitioner';

const resolvers = [clientResolver, sessionResolver, sessionDocumentResolver, practitionerResolver];

export default mergeResolvers(resolvers);
