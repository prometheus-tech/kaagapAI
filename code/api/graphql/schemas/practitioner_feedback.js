const typeDefs = `
  scalar Date 
  scalar JSON

  type PractitionerFeedback {
    pf_id: Int!
    feedback_file: Binary!
    file_name: String!
    message: String!
    date_submitted: Date!
    p_id: Int!
  }
`
module.exports = typeDefs;