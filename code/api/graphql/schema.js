const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Date 
  scalar LongText

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

  type Practioner {
    p_id: ID!
    email: String!
    phone_no: String!
    password: String!
    fname: String!
    lname: String!
    license: String!
    profession: String!
    status: [Status!]!
    date_registered: Date!
    date_deactivated: Date
    last_logged: Date
    session_token: String
  }

  type Client {
    c_id: ID!
    fname: String!
    lname: String!
    gender: [Gender!]!
    birthdate: Date!
    date_added: Date!
    last_opened: Date
    p_id: Int!
  }

  type Session {
    s_id: ID!
    session_name: String!
    date_of_session: Date!
  }

  type SessionDocument {
    id: Int!
    file: String!
    file_name: String!
    content: LongText!
    date_added: Date!
    last_modified: Date
    type: [Type!]!
  }

  type RootQuery { 
    getClients(p_id: Int!): Client
  }

  type RootMutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!): Client!

    removeClient(c_id: Int!): Client!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);