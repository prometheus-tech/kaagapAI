import { gql } from 'apollo-boost';

const SESSION_DOCUMENT_BASIC_INFO = gql`
  fragment SessionDocumentBasicInfo on SessionDocument {
    session_id
    sd_id
    file_name
    date_added
    type
    content
    should_analyze
    attachment
  }
`;

export default SESSION_DOCUMENT_BASIC_INFO;
