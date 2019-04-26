import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CustomWordCloud from './CustomWordCloud/CustomWordCloud';
import WordMapper from './WordMapper/WordMapper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import { getDocumentTalkTurns } from '../../../util/helperFunctions';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 5,
    border: '1px solid #f3f3f3',
    boxShadow: 'none'
  },
  paperHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  keyword: {
    color: grey[500],
    fontWeight: '400',
    fontSize: theme.spacing.unit * 2,
    textTransform: 'uppercase',
    letterSpacing: '2px'
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
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item xs={12} className={classes.paperHeader}>
            <Typography variant="h5" className={classes.keyword}>
              Keywords
            </Typography>
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
