import { gql } from 'apollo-boost';

const SESSION_INFO = gql`
  fragment SessionInfo on Session {
    c_id
    session_id
    session_name
    date_of_session
  }
`;

export default SESSION_INFO;
