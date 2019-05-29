import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const PERMANENTLY_DELETE_CLIENT = gql`
  mutation PermanentlyDeleteClient($c_id: UUID!) {
    permanentlyDeleteClient(c_id: $c_id) {
      ...ClientBasicInfo
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default PERMANENTLY_DELETE_CLIENT;
