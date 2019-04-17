export default `
  scalar UUID
  scalar Date

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