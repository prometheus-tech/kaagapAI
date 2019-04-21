import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import CustomWordCloud from './CustomWordCloud/CustomWordCloud';
import KeywordMapper from './KeywordMapper/KeywordMapper';

class KeywordsContainer extends Component {
  state = {
    selectedKeyword: null
  };

  selectKeywordHandler = keyword => {
    this.setState({ selectedKeyword: keyword });
  };

  render() {
    const { keywords } = this.props;

    const { selectedKeyword } = this.state;

    return (
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <CustomWordCloud
            keywords={keywords}
            keywordSelected={this.selectKeywordHandler}
          />
        </Grid>
        {selectedKeyword ? (
          <Grid item xs={4}>
            <KeywordMapper keyword={selectedKeyword} />
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default KeywordsContainer;
