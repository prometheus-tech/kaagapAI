const typeDefs = `
  scalar Date 
  scalar JSON

  enum Type {
    PDF
    TXT
    DOCX
  }

  type SessionDocument {
    id: Int!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: Type!
    session_id: Int!
  }
`
module.exports = typeDefs;