import { gql } from 'apollo-boost';

const CUSTOM_EMOTION_INFO = gql`
  fragment CustomEmotionInfo on CustomEmotion {
    custom_emotion_id
    sadness
    anger
    joy
    fear
    disgust
  }
`;

export default CUSTOM_EMOTION_INFO;
