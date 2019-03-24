import { gql } from 'apollo-boost';

import CLIENT_BASIC_INFO from '../fragments/clientBasicInfo';

const CLIENT = gql`
  query client($c_id: Int!) {
    client(c_id: $c_id) {
      __typename
      ...ClientBasicInfo
      date_added
      last_opened
    }
  }
  ${CLIENT_BASIC_INFO}
`;

export default CLIENT;
