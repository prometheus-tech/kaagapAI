const typeDefs = `
  scalar Date 
  scalar JSON

  type Session {
    session_id: ID!
    session_name: String!
    date_of_session: Date!
    c_id: Int!
  }

  type Query { 
    getSessions(c_id: Int!): [Session]!
  }

  type Mutation {
    addSession(session_name: String!, date_of_session: Date!, c_id: Int!): Session!

    removeSession(session_id: Int!, c_id: Int!): JSON!

    updateSessionInformation(session_id: Int!, session_name: String!, date_of_session: Date!): Session!
  }
`
module.exports = typeDefs;