import React, { Component } from 'react';

import TalkTurnMapItem from './TalkTurnMapItem/TalkTurnMapItem';

class DocumentMapItem extends Component {
  render() {
    const {
      document,
      keyword,
      contentSessionDocumentDialogOpened
    } = this.props;

    return (
      <div>
        {document.matchingTalkTurns.map((talkTurn, index) => {
          return (
            <TalkTurnMapItem
              key={index}
              keyword={keyword}
              talkTurn={talkTurn}
              document={document}
              contentSessionDocumentDialogOpened={
                contentSessionDocumentDialogOpened
              }
            />
          );
        })}
      </div>
    );
  }
}

export default DocumentMapItem;
