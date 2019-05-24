import { gql } from 'apollo-boost';

const OVERALL_EMOTION_INFO = gql`
  fragment OverallEmotionInfo on OverallEmotion {
    overall_emotion_id
    sadness
    anger
    joy
    fear
    disgust
  }
`;

export default OVERALL_EMOTION_INFO;
