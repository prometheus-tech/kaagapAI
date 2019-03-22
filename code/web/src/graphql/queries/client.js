import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const CLIENT = gql`
  query GetClient($c_id: Int!) {
    getClient(c_id: $c_id) {
      __typename
      ...ClientBasicInfo
      date_added
      last_opened
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default CLIENT;
