import { gql } from 'apollo-boost';

import CUSTOM_RESULT_INFO from '../fragments/customResultInfo';
import CUSTOM_SENTIMENT_INFO from '../fragments/customSentimentInfo';
import CUSTOM_KEYWORD_INFO from '../fragments/customKeywordInfo';
import CUSTOM_CATEGORY_INFO from '../fragments/customCategoryInfo';
import CUSTOM_ENTITY_INFO from '../fragments/customEntityInfo';
import CUSTOM_EMOTION_INFO from '../fragments/customEmotionInfo';
import TREND_INFO from '../fragments/trendInfo';
import SENTIMENT_INFO from '../fragments/sentimentInfo';
import EMOTION_INFO from '../fragments/emotionInfo';

const CUSTOM_RESULT = gql`
  query CustomResult($session_id: [UUID]!) {
    customResult(session_id: $session_id) {
      ...CustomResultInfo
      sentiment {
        ...CustomSentimentInfo
      }
      keywords {
        ...CustomKeywordInfo
      }
      categories {
        ...CustomCategoryInfo
      }
      entities {
        ...CustomEntityInfo
      }
      emotion {
        ...CustomEmotionInfo
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
  ${CUSTOM_RESULT_INFO}
  ${CUSTOM_SENTIMENT_INFO}
  ${CUSTOM_KEYWORD_INFO}
  ${CUSTOM_CATEGORY_INFO}
  ${CUSTOM_ENTITY_INFO}
  ${CUSTOM_EMOTION_INFO}
  ${TREND_INFO}
  ${SENTIMENT_INFO}
  ${EMOTION_INFO}
`;

export default CUSTOM_RESULT;
