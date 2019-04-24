import React, { Component } from 'react';

import SentenceMapItem from './SentenceMapItem/SentenceMapItem';

class DocumentMapItem extends Component {
  render() {
    const { document, keyword } = this.props;

    const { sd_id, file_name, type } = document;

    return (
      <div>
        {document.matchingSentences.map((sentence, index) => {
          return (
            <SentenceMapItem
              key={index}
              keyword={keyword}
              sentence={sentence}
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
