import { gql } from 'apollo-boost';

const TREND = gql`
  fragment TrendInfo on Trend {
    trend_id
    session_id
  }
`;

export default TREND;
