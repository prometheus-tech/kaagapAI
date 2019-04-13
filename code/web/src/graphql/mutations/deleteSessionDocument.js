import { gql } from 'apollo-boost';

const DELETE_SESSION_DOCUMENT = gql`
  mutation DeleteSessionDocument($sd_id: UUID!) {
    deleteSessionDocument(sd_id: $sd_id) {
      sd_id
      file_name
    }
  }
`;

export default DELETE_SESSION_DOCUMENT;
