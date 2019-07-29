import { gql } from 'apollo-boost';

const TEXT_OCCURRENCE_INFO = gql`
  fragment TextOccurrenceInfo on TextOccurence {
    text_occurrence_id
    text
  }
`;

export default TEXT_OCCURRENCE_INFO;
