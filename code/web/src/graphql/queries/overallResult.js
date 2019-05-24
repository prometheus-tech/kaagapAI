import { gql } from 'apollo-boost';

import OVERALL_RESULTS_INFO from '../fragments/overallResultInfo';
import OVERALL_SENTIMENT_INFO from '../fragments/overallSentimentInfo';
import OVERALL_KEYWORD_INFO from '../fragments/overallKeywordInfo';
import OVERALL_CATEGORY_INFO from '../fragments/overallCategoryInfo';
import OVERALL_ENTITY_INFO from '../fragments/overallEntityInfo';
import OVERALL_EMOTION_INFO from '../fragments/overallEmotionInfo';
import TREND_INFO from '../fragments/trendInfo';
import SENTIMENT_INFO from '../fragments/sentimentInfo';
import EMOTION_INFO from '../fragments/emotionInfo';

const OVERALL_RESULTS = gql`
  query OverallResult($session_id: [UUID]!) {
    overallResult(session_id: $session_id) {
      ...OverallResultInfo
      sentiment {
        ...OverallSentimentInfo
      }
      keywords {
        ...OverallKeywordInfo
      }
      categories {
        ...OverallCategoryInfo
      }
      entities {
        ...OverallEntityInfo
      }
      emotions {
        ...OverallEmotionInfo
      }
      trend {
        ...TrendInfo
        sentiment {
          ...SentimentInfo
        }
        emotion {
          ...EmotionInfo
        }
      }
    }
  }
  ${OVERALL_RESULTS_INFO}
  ${OVERALL_SENTIMENT_INFO}
  ${OVERALL_KEYWORD_INFO}
  ${OVERALL_CATEGORY_INFO}
  ${OVERALL_ENTITY_INFO}
  ${OVERALL_EMOTION_INFO}
  ${TREND_INFO}
  ${SENTIMENT_INFO}
  ${EMOTION_INFO}
`;

export default OVERALL_RESULTS;
