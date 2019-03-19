import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const CLIENTS = gql`
  query GetClients($p_id: Int!) {
    getClients(p_id: $p_id) {
      __typename
      ...ClientBasicInfo
      no_of_sessions
      date_added
      last_opened
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default CLIENTS;
