import { gql } from 'apollo-boost';

const CUSTOM_RESULT_INFO = gql`
  fragment CustomResultInfo on CustomResult {
    custom_result_id
  }
`;

export default CUSTOM_RESULT_INFO;
