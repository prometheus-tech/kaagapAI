import { gql } from 'apollo-boost';

export const CLIENT_BASIC_INFO_FRAGMENT = gql`
  fragment ClientBasicInfo on Client {
    c_id
    fname
    lname
    gender
    birthdate
  }
`;
