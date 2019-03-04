import { gql } from 'apollo-boost';

import { CLIENT_BASIC_INFO_FRAGMENT } from '../fragments/fragments';

export const GET_CLIENTS = gql`
  query GetClients($p_id: Int!) {
    getClients(p_id: $p_id) {
      ...ClientBasicInfo
      no_of_sessions
    }
  }
  ${CLIENT_BASIC_INFO_FRAGMENT}
`;
