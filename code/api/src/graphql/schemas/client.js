export default `
  scalar Date
  scalar UUID

  enum Gender {
    M
    F
  }

  enum ArchiveStatus {
    archived
    active
  }

  enum OrderByInput {
    DESC
    ASC
  }

  enum OrderByColumn {
    lname
    date_added
    last_opened
    session_name
    date_of_session
    file_name
    last_modified
  } 

  type Client {
    c_id: UUID!
    fname: String!
    lname: String!
    gender: Gender!
    birthdate: Date!
    date_added: Date!
    last_opened: Date
    status: ArchiveStatus!
    p_id: UUID!
    no_of_sessions: Int
    sessions(orderByInput: OrderByInput, orderByColumn: OrderByColumn): [Session]
    searchsession(filter: String): [Session]
  }

  type Query { 
    clients(orderByInput: OrderByInput, orderByColumn: OrderByColumn): [Client!]
    
    client(c_id: UUID!): Client

    searchclients(name: String!): [Client!]
  }

  type Mutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!): Client!

    deleteClient(c_id: UUID!): Client!

    restoreClient(c_id: UUID!): Client!

    updateClientInformation(c_id: UUID!, fname: String!, lname: String!, birthdate: Date!, gender:[Gender!]!): Client!
  }
`;
