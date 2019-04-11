import { gql } from 'apollo-boost';

const SESSION_DOCUMENT_BASIC_INFO = gql`
  fragment SessionDocumentBasicInfo on SessionDocument {
    sd_id
    file_name
    date_added
    type
    content
  }
`;

export default SESSION_DOCUMENT_BASIC_INFO;
