import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const ADD_SESSION_DOCUMENT = gql`
  mutation AddSessionDocument($file: Upload!, $session_id: UUID!) {
    uploadSessionDocument(file: $file, session_id: $session_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default ADD_SESSION_DOCUMENT;
