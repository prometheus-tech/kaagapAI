import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';
import CLIENT_META_DATA from '../fragments/clientMetaData';

const DELETE_CLIENT = gql`
  mutation DeleteClient($c_id: UUID!) {
    deleteClient(c_id: $c_id) {
      ...ClientBasicInfo
      ...ClientMetaData
    }
  }
  ${CLIENT_BASIC_INFO}
  ${CLIENT_META_DATA}
`;

export default DELETE_CLIENT;
