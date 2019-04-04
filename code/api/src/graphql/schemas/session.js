export default `
  scalar Date
  scalar UUID 

  type Session {
    session_id: UUID!
    session_name: String!
    date_of_session: Date!
    c_id: UUID!
    documents: [SessionDocument]
  }

  type Query { 
    session(session_id: UUID!): Session
  }

  type Mutation {
    addSession(session_name: String!, date_of_session: Date!, c_id: UUID!): Session!

    deleteSession(session_id: UUID!, c_id: UUID!): Session!

    updateSessionInformation(session_id: UUID!, session_name: String!, date_of_session: Date!): Session!
  }
`;
