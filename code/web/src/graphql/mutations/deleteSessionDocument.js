import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const DELETE_SESSION_DOCUMENT = gql`
  mutation DeleteSessionDocument($sd_id: UUID!) {
    deleteSessionDocument(sd_id: $sd_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default DELETE_SESSION_DOCUMENT;
