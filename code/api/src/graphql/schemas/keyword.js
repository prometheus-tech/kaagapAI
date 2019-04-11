export default `
  scalar UUID
  
  type Keyword {
    keyword_id: UUID!
    text: String!
    relevance: Int!
    count: Int!
    result_id: UUID!
  }
`