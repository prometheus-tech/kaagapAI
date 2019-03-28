import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';

const CLIENTS = gql`
  query Clients($p_id: Int!) {
    clients(p_id: $p_id) {
      ...ClientBasicInfo
      ...ClientMetaData
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
`;

export default CLIENTS;
