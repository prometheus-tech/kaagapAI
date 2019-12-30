import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Highlighter from 'react-highlight-words';
import FileBreadcrumb from '../../../../../UI/FileBreadcrumb/FileBreadcrumb';

const styles = theme => ({
  talkTurn: {
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: '1px solid #e8e8e8'
  },
  highlighter: {
    display: 'block',
    paddingBottom: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  }
});

function TalkTurn({
  classes,
  text,
  sessionId,
  sessionName,
  sessionDocumentId,
  sessionDocumentFileName,
  talkTurnText,
  type,
  pageTabValueChanged
}) {
  const regexString = '(^|[\\s\\W])(' + text + ')([\\s\\W]|$)';
  const matchRegex = new RegExp(regexString, 'gi');

  let breadcrumbData = [
    { to: '/session/' + sessionId, label: sessionName },
    { label: sessionDocumentFileName }
  ];

  return (
    <div className={classes.talkTurn}>
      <Highlighter
        className={classes.highlighter}
        searchWords={[matchRegex]}
        textToHighlight={talkTurnText}
      />
      <FileBreadcrumb
        breadcrumbData={breadcrumbData}
        type={type}
        pageTabValueChanged={pageTabValueChanged}
      />
    </div>
  );
}

export default withStyles(styles)(TalkTurn);
