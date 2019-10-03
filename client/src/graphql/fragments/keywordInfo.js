import { gql } from 'apollo-boost';

const KEYWORD_INFO = gql`
  fragment KeywordInfo on Keyword {
    keyword_id
    text
    relevance
    count
  }
`;

export default KEYWORD_INFO;
