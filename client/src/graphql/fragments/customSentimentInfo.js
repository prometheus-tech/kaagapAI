import { gql } from 'apollo-boost';

const CUSTOM_SENTIMENT_INFO = gql`
  fragment CustomSentimentInfo on CustomSentiment {
    custom_sentiment_id
    score
    label
  }
`;

export default CUSTOM_SENTIMENT_INFO;
