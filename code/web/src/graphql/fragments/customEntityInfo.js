import { gql } from 'apollo-boost';

const CUSTOM_ENTITY_INFO = gql`
  fragment CustomEntityInfo on CustomEntity {
    custom_entity_id
    type
    text
    relevance
  }
`;

export default CUSTOM_ENTITY_INFO;
