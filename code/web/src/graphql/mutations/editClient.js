import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const EDIT_CLIENT = gql`
  mutation UpdateClient(
    $c_id: Int!
    $fname: String!
    $lname: String!
    $birthdate: Date!
    $gender: [Gender!]!
  ) {
    updateClientInformation(
      c_id: $c_id
      fname: $fname
      lname: $lname
      birthdate: $birthdate
      gender: $gender
    ) {
      ...ClientBasicInfo
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default EDIT_CLIENT;
