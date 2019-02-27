const {
  buildSchema
} = require('graphql');

const typeDefs = buildSchema(`
  scalar Date 
  scalar JSON

  enum Status {
    pending
    deactivated
    active
  }

  enum Gender {
    M
    F
  }

  enum Type {
    PDF
    TXT
    DOCX
  }

  type Practitioner {
    p_id: ID!
    email: String!
    phone_no: String!
    password: String!
    fname: String!
    lname: String!
    license: String!
    profession: String!
    status: Status!
    date_registered: Date!
    date_deactivated: Date
    last_logged: Date
    session_token: String
  }

  type Client {
    c_id: ID!
    fname: String!
    lname: String!
    gender: Gender!
    birthdate: Date!
    date_added: Date!
    last_opened: Date
    p_id: Int!
  }

  type Session {
    session_id: ID!
    session_name: String!
    date_of_session: Date!
    c_id: Int!
  }

  type SessionDocument {
    id: Int!
    file: String!
    file_name: String!
    content: String!
    date_added: Date!
    last_modified: Date
    type: Type!
    session_id: Int!
  }

  type RootQuery { 
    getClients(p_id: Int!): JSON!

    getSessions(c_id: Int!): [Session]!
  }

  type RootMutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!, p_id: Int!): JSON!

    addSession(session_name: String!, date_of_session: Date!, c_id: Int!): JSON!

    removeClient(c_id: Int!): JSON!

    removeSession(session_id: Int!, c_id: Int!): JSON!

    updateClientName(c_id: Int!, fname: String!, lname: String!): JSON!

    updateClientBirthdate(c_id: Int!, birthdate: Date!): JSON!

    updateClientLastOpened(c_id: Int!): JSON!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = typeDefs;