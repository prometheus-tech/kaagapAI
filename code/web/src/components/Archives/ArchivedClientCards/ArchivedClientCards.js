import React from 'react';

import Grid from '@material-ui/core/Grid';
import ArchivedClientCard from './ArchivedClientCard/ArchivedClientCard';
import Typography from '@material-ui/core/Typography';

function ClientCards({ clients }) {
  return (
    <Grid container spacing={8} style={{ paddingBottom: '80px' }}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Clients
        </Typography>
      </Grid>
      {clients.map(client => {
        return (
          <Grid
            item
            align="center"
            key={client.c_id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <ArchivedClientCard client={client} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ClientCards;
