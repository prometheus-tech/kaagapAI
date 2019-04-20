import React, { Component } from 'react';

import WordCloud from 'react-d3-cloud';

class CustomWordCloud extends Component {
  constructor(props) {
    super(props);

    const formattedKeywords = props.keywords.map(keyword => {
      const formattedKeyword = {
        text: keyword.text,
        value: keyword.count * 10,
        ...keyword
      };

      return formattedKeyword;
    });

    this.state = {
      keywords: formattedKeywords
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.keywords === this.props.keywords) {
      return false;
    }

    return true;
  }

  render() {
    const { keywords } = this.state;

    const { keywordSelected } = this.props;

    const fontSizeMapper = word => Math.log2(word.value) * 5;

    return (
      <WordCloud
        font="sans-serif"
        data={keywords}
        fontSizeMapper={fontSizeMapper}
        onWordClick={word => {
          const { keyword_id, text, relevance, count } = word;

          keywordSelected({
            keyword_id,
            text,
            relevance,
            count
          });
        }}
        padding={3}
      />
    );
  }
}

export default CustomWordCloud;
