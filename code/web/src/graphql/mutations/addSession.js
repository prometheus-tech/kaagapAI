import { gql } from 'apollo-boost';

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
      __typename
      session_id
      session_name
      date_of_session
    }
  }
`;

export default ADD_SESSION;
