import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const EDIT_CLIENT = gql`
  mutation UpdateClient(
    $c_id: Int!
    $fname: String!
    $lname: String!
    $gender: [Gender!]!
    $birthdate: Date!
  ) {
    updateClientInformation(
      c_id: $c_id
      fname: $fname
      lname: $lname
      gender: $gender
      birthdate: $birthdate
    ) {
      ...ClientBasicInfo
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default EDIT_CLIENT;
