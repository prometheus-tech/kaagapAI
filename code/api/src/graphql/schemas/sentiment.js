export default `
  scalar UUID

  type Sentiment {
    sentiment_id: UUID!
    score: Int!
    label: String!
    session_id: UUID!
  }
`