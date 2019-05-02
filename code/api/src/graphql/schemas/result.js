export default `
  scalar UUID
  scalar Date

  type Sentiment {
    sentiment_id: UUID!
    score: Float!
    label: String!
    session_id: UUID!
  }

  type OverallSentiment {
    score: Float!
    label: String!
  }

  type Keyword {
    keyword_id: UUID!
    text: String!
    relevance: Float!
    count: Int!
    result_id: UUID!
  }

  type OverallKeyword {
    text: String!
    relevance: Float!
    count: Int!
  }

  type Category {
    category_id: UUID!
    score: Float!
    label: String!
    result_id: UUID!
  }

  type OverallCategory {
    score: Float!
    label: String!
  }

  type Entity {
    entity_id: UUID!
    type: String!
    text: String!
    relevance: Float!
    result_id: UUID!
  }

  type OverallEntity {
    type: String!
    text: String!
    relevance: Float!
  }

  type Emotion {
    emotion_id: UUID!
    sadness: Float!
    anger: Float!
    joy: Float!
    fear: Float!
    disgust: Float!
    result_id: UUID!
  }

  type OverallEmotion {
    sadness: Float!
    anger: Float!
    joy: Float!
    fear: Float!
    disgust: Float!
  }

  type Result {
    result_id: UUID!
    date_generated: Date!
    session_id: UUID!
    sentiment: [Sentiment]
    keywords: [Keyword]
    categories: [Category]
    entities: [Entity]
    emotions: [Emotion]
  }

  type Trend {
    sentiment: Sentiment
    emotion: Emotion
    session_id: UUID
  }

  type OverallResult {
    sentiment: OverallSentiment
    keywords: [OverallKeyword]
    categories: [OverallCategory]
    entities: [OverallEntity]
    emotion: OverallEmotion
    trend: [Trend]
  }

  type Query {
   result(session_id: UUID!): Result

   overallResult(session_id: [UUID]!): OverallResult
  }
`;