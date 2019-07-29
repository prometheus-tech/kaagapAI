import { gql } from 'apollo-boost';

const VERIFY_REGISTRATION = gql`
  mutation VerifyRegistration($email: String!, $input_code: String!) {
    verifyRegistration(email: $email, input_code: $input_code)
  }
`;

export default VERIFY_REGISTRATION;
