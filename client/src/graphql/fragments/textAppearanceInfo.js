import { gql } from 'apollo-boost';

const TEXT_APPEARANCE_INFO = gql`
  fragment TextAppearanceInfo on TextAppearance {
    appearance_id
    session_id
    session_name
  }
`;

export default TEXT_APPEARANCE_INFO;
