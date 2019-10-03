import { gql } from 'apollo-boost';

const CUSTOM_CATEGORY_INFO = gql`
  fragment CustomCategoryInfo on CustomCategory {
    custom_category_id
    score
    label
  }
`;

export default CUSTOM_CATEGORY_INFO;
