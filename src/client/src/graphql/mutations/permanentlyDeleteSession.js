import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const PERMANENTLY_DELETE_SESSION = gql`
  mutation PermanentlyDeleteSession($session_id: UUID!) {
    permanentlyDeleteSession(session_id: $session_id) {
      ...SessionInfo
    }
  }
  ${SESSION_INFO}
`;

export default PERMANENTLY_DELETE_SESSION;
