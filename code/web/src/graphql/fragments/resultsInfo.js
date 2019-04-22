import { gql } from 'apollo-boost';

const RESULTS_INFO = gql`
  fragment ResultsInfo on Result {
    result_id
  }
`;

export default RESULTS_INFO;
