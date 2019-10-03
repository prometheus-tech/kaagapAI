import { gql } from 'apollo-boost';

import TEXT_OCCURRENCE_INFO from '../fragments/textOccurrenceInfo';
import TEXT_APPEARANCE_INFO from '../fragments/textAppearanceInfo';
import APPEARANCE_DOCUMENT_INFO from '../fragments/appearanceDocumentInfo';
import TALK_TURN_INFO from '../fragments/talkTurnInfo';

const TEXT_OCCURRENCES = gql`
  query FindTextOccurence($text: String!, $session_id: [UUID]!) {
    findTextOccurences(text: $text, session_id: $session_id) {
      ...TextOccurrenceInfo
      text_appearances {
        ...TextAppearanceInfo
        appearance_documents {
          ...AppearanceDocumentInfo
          talk_turns {
            ...TalkTurnInfo
          }
        }
      }
    }
  }
  ${TEXT_OCCURRENCE_INFO}
  ${TEXT_APPEARANCE_INFO}
  ${APPEARANCE_DOCUMENT_INFO}
  ${TALK_TURN_INFO}
`;

export default TEXT_OCCURRENCES;
