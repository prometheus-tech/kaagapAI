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
    session(session_id: Int!): Session
  }

  type Mutation {
    addSession(session_name: String!, date_of_session: Date!, c_id: Int!): Session!

    deleteSession(session_id: Int!, c_id: Int!): Session!

    updateSessionInformation(session_id: Int!, session_name: String!, date_of_session: Date!): Session!
  }
`;
