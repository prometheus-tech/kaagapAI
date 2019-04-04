import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';
import SESSION_INFO from '../fragments/sessionInfo';

const CLIENT = gql`
  query client($c_id: UUID!) {
    client(c_id: $c_id) {
      ...ClientBasicInfo
      ...ClientMetaData
      sessions {
        ...SessionInfo
      }
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
  ${SESSION_INFO}
`;

export default CLIENT;
