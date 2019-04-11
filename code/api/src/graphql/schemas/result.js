export default `
  scalar UUID
  scalar Date

  type Result {
    result_id: UUID!
    date_generated: Date!
    session_id: UUID!
  }

  type Mutation {
    generateResults(date_generated: Date!, session_id: UUID!): Result
  }
`;