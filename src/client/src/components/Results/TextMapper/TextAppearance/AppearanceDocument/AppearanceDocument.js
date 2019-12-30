import React from 'react';
import TalkTurn from './TalkTurn/TalkTurn';

function AppearanceDocument({
  text,
  sessionId,
  sessionName,
  appearanceDocument,
  type,
  pageTabValueChanged
}) {
  return appearanceDocument.talk_turns.map(talkTurn => {
    return (
      <TalkTurn
        key={talkTurn.talk_turn_id}
        text={text}
        sessionId={sessionId}
        sessionName={sessionName}
        sessionDocumentId={appearanceDocument.sd_id}
        sessionDocumentFileName={appearanceDocument.file_name}
        talkTurnText={talkTurn.talk_turn_text}
        type={type}
        pageTabValueChanged={pageTabValueChanged}
      />
    );
  });
}

export default AppearanceDocument;
