import { gql } from 'apollo-boost';

const PRACTITIONER_INFO = gql`
  fragment PractitionerInfo on Practitioner {
    email
    phone_no
    fname
    lname
    license
    profession
  }
`;

export default PRACTITIONER_INFO;
