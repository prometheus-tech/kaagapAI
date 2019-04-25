import React, { Component } from 'react';

import TalkTurnMapItem from './TalkTurnMapItem/TalkTurnMapItem';

class DocumentMapItem extends Component {
  render() {
    const { document, keyword } = this.props;

    const { sd_id, file_name, type } = document;

    return (
      <div>
        {document.matchingTalkTurns.map((talkTurn, index) => {
          return (
            <TalkTurnMapItem
              key={index}
              keyword={keyword}
              talkTurn={talkTurn}
              sd_id={sd_id}
              file_name={file_name}
              type={type}
            />
          );
        })}
      </div>
    );
  }
}

export default DocumentMapItem;
