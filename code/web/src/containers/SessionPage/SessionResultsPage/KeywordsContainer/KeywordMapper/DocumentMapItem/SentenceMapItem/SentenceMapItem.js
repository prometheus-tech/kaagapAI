import React from 'react';

import Highlighter from 'react-highlight-words';

function SentenceMapItem(props) {
  const { document, keyword, sentence } = props;
  return (
    <Highlighter
      style={{ display: 'block', marginBottom: 24 }}
      searchWords={[keyword]}
      autoEscape={true}
      textToHighlight={sentence + '...'}
    />
  );
}

export default SentenceMapItem;
