import { gql } from 'apollo-boost';

const CUSTOM_KEYWORD_INFO = gql`
  fragment CustomKeywordInfo on CustomKeyword {
    custom_keyword_id
    text
    relevance
    count
  }
`;

export default CUSTOM_KEYWORD_INFO;
