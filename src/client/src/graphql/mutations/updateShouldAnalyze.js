import { gql } from 'apollo-boost';

import SESSION_DOCUMENT_BASIC_INFO from '../fragments/sessionDocumentBasicInfo';

const UPDATE_SHOULD_ANALYZE = gql`
  mutation updateShouldAnalyze($sd_id: UUID!) {
    updateShouldAnalyze(sd_id: $sd_id) {
      ...SessionDocumentBasicInfo
    }
  }
  ${SESSION_DOCUMENT_BASIC_INFO}
`;

export default UPDATE_SHOULD_ANALYZE;
