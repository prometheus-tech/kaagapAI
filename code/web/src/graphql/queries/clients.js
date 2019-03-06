import { gql } from 'apollo-boost';

import clientBasicInfo from '../fragments/clientBasicInfo';

const clients = gql`
  query GetClients($p_id: Int!) {
    getClients(p_id: $p_id) {
      ...ClientBasicInfo
      no_of_sessions
    }
  }
  ${clientBasicInfo}
`;

export default clients;
