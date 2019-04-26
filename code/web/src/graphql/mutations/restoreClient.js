import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';

const RESTORE_CLIENT = gql`
  mutation RestoreClient($c_id: UUID!) {
    restoreClient(c_id: $c_id) {
      ...ClientBasicInfo
      ...ClientMetaData
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
`;

export default RESTORE_CLIENT;
