import { gql } from 'apollo-boost';

const OVERALL_KEYWORD_INFO = gql`
  fragment OverallKeywordInfo on OverallKeyword {
    overall_keyword_id
    text
    relevance
    count
  }
`;

export default OVERALL_KEYWORD_INFO;
