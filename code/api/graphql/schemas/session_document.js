const typeDefs = `
  scalar Date 
  scalar JSON

  enum Type {
    PDF
    TXT
    DOCX
  }

  type SessionDocument {
    sd_id: Int!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: Type!
    session_id: Int!
  }

  type Query { 
    getSessionDocuments(session_id: Int!): JSON!

    getSessionDocument(sd_id: Int!): JSON!
  }
`
module.exports = typeDefs;