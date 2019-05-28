import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  paper: {
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)'
  },
  paperHeader: {
    borderBottom: '1px solid #e6e6e6',
    padding: theme.spacing.unit * 2
  },
  paperHeaderText: {
    color: grey[500],
    fontWeight: 500,
    fontSize: theme.spacing.unit * 2,
    textTransform: 'uppercase'
  }
});

function ResultPaper({
  classes,
  children,
  header,
  headerGutter,
  marginBottom,
  contentPadding
}) {
  return (
    <Paper
      className={classes.paper}
      style={{ marginBottom: marginBottom ? '24px' : '0px' }}
    >
      {header ? (
        <div
          className={classes.paperHeader}
          style={{ marginBottom: headerGutter ? '16px' : '0px' }}
        >
          <Typography variant="h5" className={classes.paperHeaderText}>
            {header}
          </Typography>
        </div>
      ) : null}
      <div style={{ padding: contentPadding ? '16px 36px 16px 36px' : '0px' }}>
        {children}
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ResultPaper);
