import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const DELETE_SESSION = gql`
  mutation DeleteSession($session_id: UUID!) {
    deleteSession(session_id: $session_id) {
      ...SessionInfo
    }
  }
  ${SESSION_INFO}
`;

export default DELETE_SESSION;
