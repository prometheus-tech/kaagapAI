export default `
  scalar UUID

  type Entity {
    entity_id: UUID!
    type: String!
    text: String!
    relevance: Int!
    result_id: UUID!
  }
`