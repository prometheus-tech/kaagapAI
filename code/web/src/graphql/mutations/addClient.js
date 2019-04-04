import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';

const ADD_CLIENT = gql`
  mutation AddClient(
    $p_id: UUID!
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
      ...ClientBasicInfo
      ...ClientMetaData
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
`;

export default ADD_CLIENT;
