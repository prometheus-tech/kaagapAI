import React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';

const styles = theme => ({
  container: {
    marginBottom: 16
  }
});

const getNewView = view => {
  return view === 'list' ? 'module' : 'list';
};

function ViewControl(props) {
  const { classes } = props;

  const icon = props.view === 'list' ? <ViewList /> : <ViewModule />;

  return (
    <Grid
      container
      spacing={0}
      justify="flex-end"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} />
      <Grid item>
        <IconButton
          onClick={() => {
            props.viewChanged(getNewView(props.view));
          }}
        >
          {icon}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ViewControl);
