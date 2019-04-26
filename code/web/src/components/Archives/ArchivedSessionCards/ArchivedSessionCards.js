import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArchivedSessionCard from './ArchivedSessionCard/ArchivedSessionCard';

function ArchivedSessionCards({ sessions }) {
  return (
    <Grid container spacing={8} style={{ paddingBottom: '80px' }}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Sessions
        </Typography>
      </Grid>
      {sessions.map(session => {
        return (
          <Grid
            item
            align="center"
            key={session.session_id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <ArchivedSessionCard session={session} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ArchivedSessionCards;
