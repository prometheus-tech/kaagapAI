import { gql } from 'apollo-boost';

const EMOTION_INFO = gql`
  fragment EmotionInfo on Emotion {
    emotion_id
    sadness
    anger
    joy
    fear
    disgust
  }
`;

export default EMOTION_INFO;
