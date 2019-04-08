export default `
  scalar Date 
  scalar UUID

  enum ArchiveStatus {
    archived
    active
  }

  type SessionDocument {
    sd_id: UUID!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: String!
    archive_status: ArchiveStatus!
    session_id: UUID!
  }

  type Query { 
    sessionDocuments(session_id: UUID!): [SessionDocument]

    sessionDocument(sd_id: UUID!): SessionDocument

    downloadSessionDocument(sd_id: UUID!, savePath: String!): SessionDocument! 
  }

  type Mutation {
    uploadSessionDocument(file: Upload!, session_id: UUID!): SessionDocument!
  }
`;
