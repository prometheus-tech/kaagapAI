import React from 'react';

import Grid from '@material-ui/core/Grid';
import kaagapaiPreloader from '../../../assets/kaagapai_preloader.svg';

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
        <img
          src={kaagapaiPreloader}
          style={{ marginTop: '10vh', height: '20vh' }}
          alt="Loading...."
        />
      </Grid>
    </Grid>
  );
}

export default LoadingFullScreen;
