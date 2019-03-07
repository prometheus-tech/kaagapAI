const typeDefs = `
  scalar Date 
  scalar JSON

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
    no_of_sessions:Int
  }

  type Query { 
    getClients(p_id: Int!): [Client]!

    getClient(c_id: Int!): Client!
  }

  type Mutation {
    addClient(fname: String!, lname: String!, gender:[Gender!]!, birthdate: Date!, p_id: Int!): Client!

    removeClient(c_id: Int!): JSON!

    updateClientInformation(c_id: Int!, fname: String!, lname: String!, birthdate: Date!, gender:[Gender!]!): Client!
  }
`;
module.exports = typeDefs;
