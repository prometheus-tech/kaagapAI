import { gql } from 'apollo-boost';

const DELETE_CLIENT = gql`
  mutation DeleteClient($c_id: Int!) {
    deleteClient(c_id: $c_id) {
      __typename
      c_id
      fname
      lname
    }
  }
`;

export default DELETE_CLIENT;
