import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const EDIT_SESSION = gql`
  mutation EditSession(
    $session_id: UUID!
    $session_name: String!
    $date_of_session: Date!
  ) {
    updateSessionInformation(
      session_id: $session_id
      session_name: $session_name
      date_of_session: $date_of_session
    ) {
      ...SessionInfo
    }
  }
  ${SESSION_INFO}
`;

export default EDIT_SESSION;
