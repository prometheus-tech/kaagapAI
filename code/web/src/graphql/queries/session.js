import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';
import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const SESSION = gql`
  query Session($session_id: UUID!) {
    session(session_id: $session_id) {
      ...SessionInfo
      documents {
        ...SessionDocumentBasicInfo
      }
    }
  }
  ${SESSION_INFO}
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default SESSION;
