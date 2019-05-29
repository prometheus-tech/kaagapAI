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
    status: ArchiveStatus!
    should_analyze: Boolean!
    attachment: Boolean!
    session_id: UUID!
  }

  type Query { 
    sessionDocument(sd_id: UUID!): SessionDocument!
  }
 
  type Mutation {
    uploadSessionDocument(file: Upload!, session_id: UUID!): SessionDocument!

    uploadSessionAttachment(file: Upload!, session_id: UUID!): SessionDocument!

    editSessionDocument(sd_id: UUID!, content: String!, file_name: String!): SessionDocument!

    deleteSessionDocument(sd_id: UUID!): SessionDocument!

    restoreSessionDocument(sd_id: UUID!): SessionDocument!

    permanentlyDeleteSessionDocument(sd_id: UUID!): SessionDocument

    updateShouldAnalyze(sd_id: UUID!): SessionDocument!

    downloadSessionDocument(sd_id: UUID!): SessionDocument!
  }
`;
