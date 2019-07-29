import { gql } from 'apollo-boost';

const GET_FILE = gql`
  mutation GetFile($sd_id: UUID!) {
    getFile(sd_id: $sd_id)
  }
`;

export default GET_FILE;
