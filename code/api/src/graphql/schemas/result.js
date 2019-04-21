export default `
  scalar UUID
  scalar Date

  type Sentiment {
    sentiment_id: UUID!
    score: Int!
    label: String!
    session_id: UUID!
  }

  type Keyword {
    keyword_id: UUID!
    text: String!
    relevance: Int!
    count: Int!
    result_id: UUID!
  }

  type Category {
    category_id: UUID!
    score: Int!
    label: String!
    result_id: UUID!
  }

  type Entity {
    entity_id: UUID!
    type: String!
    text: String!
    relevance: Int!
    result_id: UUID!
  }

  type Emotion {
    emotion_id: UUID!
    sadness: Int!
    anger: Int!
    joy: Int!
    fear: Int!
    disgust: Int!
    result_id: UUID!
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

  type Query {
    result(session_id: UUID!):Result!
  }

  type Mutation {
    generateResults(session_id: UUID!): Result
  }
`;