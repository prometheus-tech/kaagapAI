import { gql } from 'apollo-boost';

const APPEARANCE_DOCUMENT_INFO = gql`
  fragment AppearanceDocumentInfo on AppearanceDocument {
    appearance_document_id
    sd_id
    file_name
  }
`;

export default APPEARANCE_DOCUMENT_INFO;
