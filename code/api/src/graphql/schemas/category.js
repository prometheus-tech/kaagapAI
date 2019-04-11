export default `
  scalar UUID

  type Category {
    category_id: UUID!
    score: Int!
    label: String!
    result_id: UUID!
  }
`