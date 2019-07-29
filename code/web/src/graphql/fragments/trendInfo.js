import { gql } from 'apollo-boost';

const TREND = gql`
  fragment TrendInfo on Trend {
    trend_id
    session_id
    session_name
    session_date
  }
`;

export default TREND;
