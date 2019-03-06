import { gql } from 'apollo-boost';

const clientBasicInfo = gql`
  fragment ClientBasicInfo on Client {
    c_id
    fname
    lname
    gender
    birthdate
  }
`;

export default clientBasicInfo;
