export default `
  scalar UUID

  type Emotion {
    emotion_id: UUID!
    sadness: Int!
    anger: Int!
    joy: Int!
    fear: Int!
    disgust: Int!
    result_id: UUID!
  }
`