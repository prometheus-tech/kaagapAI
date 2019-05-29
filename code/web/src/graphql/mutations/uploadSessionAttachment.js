import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const UPLOAD_SESSION_ATTACHMENT = gql`
  mutation UploadSessionAttachment($file: Upload!, $session_id: UUID!) {
    uploadSessionAttachment(file: $file, session_id: $session_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default UPLOAD_SESSION_ATTACHMENT;
