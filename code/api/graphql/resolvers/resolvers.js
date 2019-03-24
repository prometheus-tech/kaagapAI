import { mergeResolvers } from 'merge-graphql-schemas';
import clientResolver from './client';
import sessionResolver from './session';
import sessionDocumentResolver from './session_documents';

const resolvers = [clientResolver, sessionResolver, sessionDocumentResolver];

export default mergeResolvers(resolvers);
