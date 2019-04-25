import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { searchMatchingTalkTurnsFromDocuments } from '../../../../util/helperFunctions';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import DocumentMapItem from '../../../UI/DocumentMapItem/DocumentMapItem';

const styles = theme => ({
  box: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '10px',
    paddingBottom: 16
  },
  keywordMapperHeader: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  mainText: {
    marginBottom: theme.spacing.unit
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.23)'
  },
  keywordMapperBody: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2
  }
});

function WordMapper(props) {
  const {
    classes,
    documents,
    keyword,
    contentSessionDocumentDialogOpened
  } = props;

  const { text, relevance, count } = keyword;

  const matchingDocuments = searchMatchingTalkTurnsFromDocuments(
    documents,
    text
  );

  return (
    <div className={classes.box}>
      <div className={classes.keywordMapperHeader}>
        <Typography className={classes.mainText} variant="h5">
          {text}
        </Typography>
        <Chip
          variant="outlined"
          className={classes.chip}
          label={'Count: ' + count}
        />
        <Chip
          variant="outlined"
          className={classes.chip}
          label={'Relevance: ' + relevance}
        />
      </div>
      <Divider className={classes.divider} light />
      {matchingDocuments.map(document => {
        return (
          <div className={classes.keywordMapperBody} key={document.sd_id}>
            <DocumentMapItem
              keyword={text}
              document={document}
              contentSessionDocumentDialogOpened={
                contentSessionDocumentDialogOpened
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(WordMapper);
