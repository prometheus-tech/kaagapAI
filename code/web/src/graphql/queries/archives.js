import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';
import SESSION_INFO from '../fragments/sessionInfo';
import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const ARCHIVES = gql`
  query Archives {
    archives {
      archives_id
      clients {
        ...ClientBasicInfo
        ...ClientMetaData
      }
      sessions {
        ...SessionInfo
      }
      session_documents {
        ...SessionDocumentBasicInfo
      }
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
  ${SESSION_INFO}
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default ARCHIVES;
