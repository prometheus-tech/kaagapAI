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
    addSession(session_name: String!, date_of_session: Date!, c_id: Int!): JSON!

    removeSession(session_id: Int!, c_id: Int!): JSON!

    updateSessionName(session_id: Int!, session_name: String!): JSON!

    updateSessionDate(session_id: Int!, date_of_session: Date!): JSON!
  }
`
module.exports = typeDefs;