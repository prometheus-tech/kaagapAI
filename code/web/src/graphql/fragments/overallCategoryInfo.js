import { gql } from 'apollo-boost';

const OVERALL_CATEGORY_INFO = gql`
  fragment OverallCategoryInfo on OverallCategory {
    overall_category_id
    score
    label
  }
`;

export default OVERALL_CATEGORY_INFO;
