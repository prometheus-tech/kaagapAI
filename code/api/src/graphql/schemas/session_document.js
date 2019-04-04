export default `
  scalar Date 
  scalar UUID

  enum Type {
    PDF
    TXT
    DOCX
  }

  type SessionDocument {
    sd_id: UUID!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: Type!
    session_id: UUID!
  }

  type Query { 
    getSessionDocuments(session_id: UUID!): [SessionDocument]

    getSessionDocument(sd_id: UUID!): SessionDocument
  }
`;
