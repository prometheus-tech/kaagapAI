import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const RESTORE_SESSION_DOCUMENT = gql`
  mutation RestoreSessionDocument($sd_id: UUID!) {
    restoreSessionDocument(sd_id: $sd_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default RESTORE_SESSION_DOCUMENT;
