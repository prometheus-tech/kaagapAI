import React from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingFullScreen() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justify="center"
      alignItems="center"
      style={{
        minHeight: '50vh',
        overflow: 'hidden'
      }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default LoadingFullScreen;
