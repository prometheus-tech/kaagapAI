import React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import Tooltip from '@material-ui/core/Tooltip';
import { toPronounCase } from '../../util/helperFunctions';

const styles = theme => ({
  container: {
    marginBottom: 16
  }
});

function ViewControl(props) {
  const { classes } = props;

  const icon = props.view === 'list' ? <ViewList /> : <ViewModule />;

  const otherView = props.view === 'list' ? 'card' : 'list';

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
        <Tooltip title={toPronounCase(props.view) + ' view'}>
          <IconButton
            onClick={() => {
              props.viewChanged(otherView);
            }}
          >
            {icon}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ViewControl);
