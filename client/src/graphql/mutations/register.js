import { gql } from 'apollo-boost';

const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $phone_no: String!
    $fname: String!
    $lname: String!
    $license: String!
    $profession: String!
  ) {
    register(
      email: $email
      password: $password
      phone_no: $phone_no
      fname: $fname
      lname: $lname
      license: $license
      profession: $profession
    )
  }
`;

export default REGISTER;
