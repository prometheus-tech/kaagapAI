import { gql } from 'apollo-boost';

const CATEGORY_INFO = gql`
  fragment CategoryInfo on Category {
    category_id
    score
    label
  }
`;

export default CATEGORY_INFO;
