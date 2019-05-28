import { gql } from 'apollo-boost';

const TALK_TURN_INFO = gql`
  fragment TalkTurnInfo on TalkTurn {
    talk_turn_id
    talk_turn_text
  }
`;

export default TALK_TURN_INFO;
