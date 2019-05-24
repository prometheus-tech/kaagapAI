import { gql } from 'apollo-boost';

const OVERALL_ENTITY_INFO = gql`
  fragment OverallEntityInfo on OverallEntity {
    overall_entity_id
    type
    text
    relevance
  }
`;

export default OVERALL_ENTITY_INFO;
