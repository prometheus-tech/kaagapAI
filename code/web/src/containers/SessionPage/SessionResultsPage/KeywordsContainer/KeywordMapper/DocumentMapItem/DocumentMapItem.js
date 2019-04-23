import React, { Component } from 'react';

import SentenceMapItem from './SentenceMapItem/SentenceMapItem';

class DocumentMapItem extends Component {
  render() {
    const { document, keyword } = this.props;

    return (
      <div>
        {document.matchingSentences.map((sentence, index) => {
          return (
            <SentenceMapItem
              key={index}
              keyword={keyword}
              sentence={sentence}
            />
          );
        })}
      </div>
    );
  }
}

export default DocumentMapItem;
