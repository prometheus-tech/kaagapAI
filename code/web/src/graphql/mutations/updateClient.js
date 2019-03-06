import { gql } from 'apollo-boost';

import clientBasicInfo from '../fragments/clientBasicInfo';

const updateClient = gql`
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
  ${clientBasicInfo}
`;

export default updateClient;
