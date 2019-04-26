export default `
  scalar Date 
  scalar JSON
  
  enum Status {
    pending
    deactivated
    active
  }

  type Archives {
    archives_id: UUID
    clients: [Client]
    sessions: [Session]
    session_documents: [SessionDocument]
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
    verification_code: String!
  }

  type Query {
    profile: JSON!

    archives: Archives
  }

  type Mutation {
    login(email: String!, password: String!): JSON!

    register(email: String!, password: String!, phone_no: String!, fname: String!, lname: String!, license: String!, profession: String!): JSON

    verifyRegistration(email: String!,input_code:String!):JSON

    updateProfile(email: String!, password: String!, phone_no: String!, fname: String!, lname: String!): JSON!

    forgotPassword(email: String!): JSON

    changePassword(email: String!, changePasswordToken: String!, password: String!): JSON
  }
`;
