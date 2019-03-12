import { gql } from 'apollo-boost';

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
      __typename
      c_id
      fname
      lname
      birthdate
      gender
      no_of_sessions
    }
  }
`;

export default EDIT_CLIENT;
