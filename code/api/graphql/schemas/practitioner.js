const typeDefs = `
  scalar Date 
  scalar JSON
  
  enum Status {
    pending
    deactivated
    active
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
`
module.exports = typeDefs;