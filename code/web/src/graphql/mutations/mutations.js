import { gql } from 'apollo-boost';

import { CLIENT_BASIC_INFO_FRAGMENT } from '../fragments/fragments';

export const UPDATE_CLIENT = gql`
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
  ${CLIENT_BASIC_INFO_FRAGMENT}
`;
