import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const DOWNLOAD_SESSION_DOCUMENT = gql`
  mutation DownloadSessionDocument($sd_id: UUID!) {
    downloadSessionDocument(sd_id: $sd_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default DOWNLOAD_SESSION_DOCUMENT;
