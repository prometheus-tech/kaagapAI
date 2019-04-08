import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const SESSION = gql`
  query Session($session_id: UUID!) {
    session(session_id: $session_id) {
      c_id
      ...SessionInfo
      documents {
        sd_id
        file
        date_added
        type
      }
    }
  }
  ${SESSION_INFO}
`;

export default SESSION;
