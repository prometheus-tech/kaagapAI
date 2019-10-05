import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const RESTORE_SESSION = gql`
  mutation RestoreSession($session_id: UUID!) {
    restoreSession(session_id: $session_id) {
      ...SessionInfo
    }
  }
  ${SESSION_INFO}
`;

export default RESTORE_SESSION;
