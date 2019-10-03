import { gql } from 'apollo-boost';

const ENTITY_INFO = gql`
  fragment EntityInfo on Entity {
    entity_id
    type
    text
    relevance
  }
`;

export default ENTITY_INFO;
