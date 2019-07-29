import { gql } from 'apollo-boost';

import PRACTITIONER_INFO from '../fragments/practitionerInfo';

const PROFILE = gql`
  query Profile {
    profile {
      ...PractitionerInfo
    }
  }
  ${PRACTITIONER_INFO}
`;

export default PROFILE;
