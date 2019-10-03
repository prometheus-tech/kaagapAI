import { gql } from 'apollo-boost';

import RESULTS_INFO from '../fragments/resultsInfo';
import SENTIMENT_INFO from '../fragments/sentimentInfo';
import KEYWORD_INFO from '../fragments/keywordInfo';
import CATEGORY_INFO from '../fragments/categoryInfo';
import ENTITY_INFO from '../fragments/entityInfo';
import EMOTION_INFO from '../fragments/emotionInfo';

const RESULTS = gql`
  query Result($session_id: UUID!) {
    result(session_id: $session_id) {
      ...ResultsInfo
      sentiment {
        ...SentimentInfo
      }
      keywords {
        ...KeywordInfo
      }
      categories {
        ...CategoryInfo
      }
      entities {
        ...EntityInfo
      }
      emotions {
        ...EmotionInfo
      }
    }
  }
  ${RESULTS_INFO}
  ${SENTIMENT_INFO}
  ${KEYWORD_INFO}
  ${CATEGORY_INFO}
  ${ENTITY_INFO}
  ${EMOTION_INFO}
`;

export default RESULTS;
