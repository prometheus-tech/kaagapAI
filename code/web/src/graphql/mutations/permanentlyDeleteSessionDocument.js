import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const PERMANENTLY_DELETE_SESSION_DOCUMENT = gql`
  mutation PermanentlyDeleteSessionDocument($sd_id: UUID!) {
    permanentlyDeleteSessionDocument(sd_id: $sd_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default PERMANENTLY_DELETE_SESSION_DOCUMENT;
