import { gql } from 'apollo-boost';

const CLIENT_BASIC_INFO = gql`
  fragment ClientBasicInfo on Client {
    p_id
    c_id
    fname
    lname
    gender
    birthdate
    no_of_sessions
  }
`;

export default CLIENT_BASIC_INFO;
