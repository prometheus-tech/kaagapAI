import { gql } from 'apollo-boost';

import SESSION_INFO from '../fragments/sessionInfo';

const ADD_SESSION = gql`
  mutation AddSession(
    $c_id: Int!
    $session_name: String!
    $date_of_session: Date!
  ) {
    addSession(
      c_id: $c_id
      session_name: $session_name
      date_of_session: $date_of_session
    ) {
      ...SessionInfo
    }
  }
  ${SESSION_INFO}
`;

export default ADD_SESSION;
