import { gql } from 'apollo-boost';

const CLIENT_META_DATA = gql`
  fragment ClientMetaData on Client {
    date_added
    last_opened
  }
`;

export default CLIENT_META_DATA;
