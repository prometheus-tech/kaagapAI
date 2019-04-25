import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CustomWordCloud from './CustomWordCloud/CustomWordCloud';
import WordMapper from './WordMapper/WordMapper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getDocumentTalkTurns } from '../../../util/helperFunctions';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paperHeader: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Keywords extends Component {
  state = {
    selectedKeyword: null
  };

  selectKeywordHandler = keyword => {
    this.setState({ selectedKeyword: keyword });
  };

  render() {
    const {
      keywords,
      documents,
      classes,
      contentSessionDocumentDialogOpened
    } = this.props;

    const { selectedKeyword } = this.state;

    const preprocessedDocuments = getDocumentTalkTurns(documents);

    return (
      <Paper className={classes.paper} elevation={1}>
        <Grid container spacing={16}>
          <Grid item xs={12} className={classes.paperHeader}>
            <Typography variant="h5">Keywords</Typography>
          </Grid>
          <Grid item xs={7}>
            <CustomWordCloud
              keywords={keywords}
              keywordSelected={this.selectKeywordHandler}
            />
          </Grid>
          {selectedKeyword ? (
            <Grid item xs={5}>
              <WordMapper
                keyword={selectedKeyword}
                documents={preprocessedDocuments}
                contentSessionDocumentDialogOpened={
                  contentSessionDocumentDialogOpened
                }
              />
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Keywords);
