import { gql } from 'apollo-boost';

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
      c_id
      fname
      lname
      gender
      birthdate
      no_of_sessions
    }
  }
`;

export default ADD_CLIENT;
