import { gql } from 'apollo-boost';

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($changePasswordToken: String!, $password: String!) {
    changePassword(
      changePasswordToken: $changePasswordToken
      password: $password
    )
  }
`;

export default CHANGE_PASSWORD;
