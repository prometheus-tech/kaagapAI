export default `
  scalar Date
  scalar UUID 

  enum ArchiveStatus {
    archived
    active
  }

  type Session {
    session_id: UUID!
    session_name: String!
    date_of_session: Date!
    status: ArchiveStatus!
    c_id: UUID!
    documents(orderByInput: OrderByInput, orderByColumn: OrderByColumn): [SessionDocument]
    searchdocument(filter: String): [SessionDocument]
  }

  type Query { 
    session(session_id: UUID!): Session
  }

  type Mutation {
    addSession(session_name: String!, date_of_session: Date!, c_id: UUID!): Session!

    deleteSession(session_id: UUID!): Session!

    restoreSession(session_id: UUID!): Session!

    permanentlyDeleteSession(session_id: UUID!): Session

    updateSessionInformation(session_id: UUID!, session_name: String!, date_of_session: Date!): Session!
  }
`;
