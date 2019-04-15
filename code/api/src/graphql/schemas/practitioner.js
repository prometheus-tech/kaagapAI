export default `
  scalar Date 
  scalar JSON
  
  enum Status {
    pending
    deactivated
    active
  }

  type Practitioner {
    p_id: UUID!
    email: String!
    phone_no: String!
    fname: String!
    lname: String!
    license: String!
    profession: String!
    user_status: Status!
    date_registered: Date!
    date_deactivated: Date
    last_logged: Date
  }

  type Mutation {
    login(email: String!, password: String!): JSON
  }
`;
