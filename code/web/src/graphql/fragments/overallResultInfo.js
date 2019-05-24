import { gql } from 'apollo-boost';

const OVERALL_RESULTS_INFO = gql`
  fragment OverallResultInfo on OverallResult {
    overall_result_id
  }
`;

export default OVERALL_RESULTS_INFO;
