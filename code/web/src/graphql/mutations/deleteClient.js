import { gql } from 'apollo-boost';

const DELETE_CLIENT = gql`
  mutation DeleteClient($c_id: UUID!) {
    deleteClient(c_id: $c_id) {
      c_id
      fname
      lname
    }
  }
`;

export default DELETE_CLIENT;
