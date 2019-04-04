export default `
  scalar Date
  scalar UUID

  enum Gender {
    M
    F
  }

  type Client {
    c_id: UUID!
    fname: String!
    lname: String!
    gender: Gender!
    birthdate: Date!
    date_added: Date!
    last_opened: Date
    p_id: UUID!
    no_of_sessions: Int
    sessions: [Session]
  }

  type Query { 
    clients(p_id: UUID!): [Client!]
    
    client(c_id: UUID!): Client
  }

  type Mutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!, p_id: UUID!): Client!

    deleteClient(c_id: UUID!): Client!

    updateClientInformation(c_id: UUID!, fname: String!, lname: String!, birthdate: Date!, gender:[Gender!]!): Client!
  }
`;
