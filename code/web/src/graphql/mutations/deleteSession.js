import { gql } from 'apollo-boost';

const DELETE_SESSION = gql`
  mutation DeleteSession($session_id: UUID!) {
    deleteSession(session_id: $session_id) {
      c_id
      session_id
      session_name
    }
  }
`;

export default DELETE_SESSION;
