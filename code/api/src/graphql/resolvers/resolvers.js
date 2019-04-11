import { mergeResolvers } from 'merge-graphql-schemas';
import clientResolver from './client';
import sessionResolver from './session';
import sessionDocumentResolver from './session_document';
import resultResolver from './result';

const resolvers = [clientResolver, sessionResolver, sessionDocumentResolver, resultResolver];

export default mergeResolvers(resolvers);
