import { gql } from 'apollo-boost';

const ADD_CLIENT = gql`
  mutation AddClient(
    $fname: String!
    $lname: String!
    $gender: [Gender!]!
    $birthdate: Date!
    $p_id: Int!
  ) {
    addClient(
      fname: $fname
      lname: $lname
      gender: $gender
      birthdate: $birthdate
      p_id: $p_id
    ) {
      fname
      lname
      gender
      birthdate
      c_id
      no_of_sessions
    }
  }
`;

export default ADD_CLIENT;
