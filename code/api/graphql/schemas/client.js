export default `
  scalar Date

  enum Gender {
    M
    F
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
    no_of_sessions: Int
    sessions: [Session]
  }

  type Query { 
    clients(p_id: Int!): [Client!]
    
    client(c_id: Int!): Client
  }

  type Mutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!, p_id: Int!): Client!

    deleteClient(c_id: Int!): Client!

    updateClientInformation(c_id: Int!, fname: String!, lname: String!, birthdate: Date!, gender:[Gender!]!): Client!
  }
`;
