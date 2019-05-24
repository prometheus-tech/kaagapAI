export default `
  scalar UUID
  scalar Date

  type Sentiment {
    sentiment_id: UUID!
    score: Float!
    label: String!
    session_id: UUID!
  }

  type CustomSentiment {
    custom_sentiment_id: UUID
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

  type CustomKeyword {
    custom_keyword_id: UUID
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

  type CustomCategory {
    custom_category_id: UUID
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

  type CustomEntity {
    custom_entity_id: UUID
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

  type CustomEmotion {
    custom_emotion_id: UUID
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
    trend_id: UUID
    sentiment: Sentiment
    emotion: Emotion
    session_id: UUID
    session_name: String
  }

  type CustomResult {
    custom_result_id: UUID
    sentiment: CustomSentiment
    keywords: [CustomKeyword]
    categories: [CustomCategory]
    entities: [CustomEntity]
    emotion: CustomEmotion
    trend: [Trend]
  }

  type Query {
   result(session_id: UUID!): Result

   customSessionResult(session_id: [UUID]!): CustomResult

   customDocumentResult(sd_id: [UUID]!): CustomResult
  }
`;