import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const ADD_CLIENT = gql`
  mutation AddClient(
    $p_id: Int!
    $fname: String!
    $lname: String!
    $gender: [Gender!]!
    $birthdate: Date!
  ) {
    addClient(
      p_id: $p_id
      fname: $fname
      lname: $lname
      gender: $gender
      birthdate: $birthdate
    ) {
      __typename
      ...ClientBasicInfo
      no_of_sessions
      date_added
      last_opened
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default ADD_CLIENT;
