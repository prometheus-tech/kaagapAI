import { gql } from 'apollo-boost';

const OVERALL_SENTIMENT_INFO = gql`
  fragment OverallSentimentInfo on OverallSentiment {
    overall_sentiment_id
    score
    label
  }
`;

export default OVERALL_SENTIMENT_INFO;
