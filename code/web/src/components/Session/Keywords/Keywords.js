import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CustomWordCloud from './CustomWordCloud/CustomWordCloud';
import WordMapper from './WordMapper/WordMapper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';
import iconEmpty from '../../../assets/Keywords_Gray.svg';
import { getDocumentTalkTurns } from '../../../util/helperFunctions';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    width: '100%',
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)'
  },
  paperMapper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    border: '1px solid #f3f3f3',
    width: '100%',
    height: '475px',
    overflowY: 'scroll',
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)'
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
  },
  emptyContainer: {
    textAlign: 'center',
    marginTop: '45%'
  },
  iconEmpty: {
    height: '15vh'
  },
  actionCloud: {
    fontSize: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit * 1.5
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
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.paperHeader}>
              <Typography variant="h5" className={classes.keyword}>
                Keywords
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <CustomWordCloud
                keywords={keywords}
                keywordSelected={this.selectKeywordHandler}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperMapper}>
            {selectedKeyword ? (
              <WordMapper
                keyword={selectedKeyword}
                documents={preprocessedDocuments}
                contentSessionDocumentDialogOpened={
                  contentSessionDocumentDialogOpened
                }
              />
            ) : (
              <div className={classes.emptyContainer}>
                <img
                  src={iconEmpty}
                  className={classes.iconEmpty}
                  alt="No keyword"
                />
                <Typography className={classes.actionCloud}>
                  Click the keyword on the wordcloud.
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Keywords);
