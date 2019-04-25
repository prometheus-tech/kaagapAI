import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  sentenceMapItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24
  },
  findInPageIconButton: {
    backgroundColor: purple[500],
    color: 'white'
  },
  highlighter: {
    display: 'block',
    paddingBottom: theme.spacing.unit,
    borderBottom: '1px solid #e8e8e8',
    marginRight: theme.spacing.unit * 2
  }
});

function TalkTurnMapItem(props) {
  const {
    keyword,
    talkTurn,
    document,
    classes,
    contentSessionDocumentDialogOpened
  } = props;

  const regexString = '(^|[\\s\\W])(' + keyword + ')([\\s\\W]|$)';
  const matchRegex = new RegExp(regexString, 'gi');

  return (
    <div className={classes.sentenceMapItem}>
      <Highlighter
        className={classes.highlighter}
        searchWords={[matchRegex]}
        textToHighlight={talkTurn}
      />
      <IconButton
        className={classes.findInPageIconButton}
        onClick={() => {
          contentSessionDocumentDialogOpened(document);
        }}
      >
        <FindInPageIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default withStyles(styles)(TalkTurnMapItem);
