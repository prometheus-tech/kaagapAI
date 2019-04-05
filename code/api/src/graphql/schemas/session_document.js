export default `
  scalar Date 
  scalar UUID

  type SessionDocument {
    sd_id: UUID!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: String!
    session_id: UUID!
  }

  type Query { 
    getSessionDocuments(session_id: UUID!): [SessionDocument]

    getSessionDocument(sd_id: UUID!): SessionDocument
  }
`;
