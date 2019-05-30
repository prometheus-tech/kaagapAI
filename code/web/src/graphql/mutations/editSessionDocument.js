import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const EDIT_SESSION_DOCUMENT = gql`
  mutation EditSessionDocument(
    $sd_id: UUID!
    $content: String
    $file_name: String!
  ) {
    editSessionDocument(
      sd_id: $sd_id
      content: $content
      file_name: $file_name
    ) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default EDIT_SESSION_DOCUMENT;
