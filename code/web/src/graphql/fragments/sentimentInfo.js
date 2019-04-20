import { gql } from 'apollo-boost';

const SENTIMENT_INFO = gql`
  fragment SentimentInfo on Sentiment {
    sentiment_id
    score
    label
  }
`;

export default SENTIMENT_INFO;
