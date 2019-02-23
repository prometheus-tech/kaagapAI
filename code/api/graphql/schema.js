const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Date 
  scalar BLOB
  scalar Text

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
    phone_no: Char!
    password: Char!
    fname: String!
    lname: String!
    license: Char!
    profession: String!
    status: [Status!]!,
    date_registered: Date!
    date_deactivated: Date
    last_logged: Date
    session_token: Char
  }

  type Client {
    c_id: ID!
    fname: String!
    lname: String!
    gender: [Gender!]!
    birthdate: Date!
    date_added: Date!
    last_opened: Date
  }

  type Session {
    s_id: ID!
    session_name: String!
    date_of_session: Date!
  }

  type SessionDocument {
    id: Int!
    file: BLOB!
    file_name: String!
    content: Text!
    date_added: Date!
    last_modified: Date
    type: [Type!]!
  }

  type RootQuery { 

  }

  type RootMutation {
    
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);