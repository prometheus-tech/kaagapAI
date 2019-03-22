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
    getSessionDocuments(session_id: Int!): [Session]!

    getSessionDocument(sd_id: Int!): Session!
  }
`
module.exports = typeDefs;