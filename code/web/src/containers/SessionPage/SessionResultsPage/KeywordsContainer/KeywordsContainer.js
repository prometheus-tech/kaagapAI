import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import CustomWordCloud from './CustomWordCloud/CustomWordCloud';

class KeywordsContainer extends Component {
  state = {
    selectedKeyword: null
  };

  selectKeywordHandler = keyword => {
    this.setState({ selectedKeyword: keyword });
  };

  render() {
    const { keywords } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <CustomWordCloud
            keywords={keywords}
            keywordSelected={this.selectKeywordHandler}
          />
        </Grid>
      </Grid>
    );
  }
}

export default KeywordsContainer;
