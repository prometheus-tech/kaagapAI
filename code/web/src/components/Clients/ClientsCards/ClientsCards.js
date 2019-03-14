import React from 'react';

import Grid from '@material-ui/core/Grid';
import ClientCard from './ClientCard/ClientCard';

function ClientsCards(props) {
  const { clients } = props;

  let renderedUI = null;

  if (clients.length > 0) {
    renderedUI = clients.map(client => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={client.c_id}>
          <ClientCard client={client} />
        </Grid>
      );
    });
  }

  return (
    <Grid container spacing={16}>
      {renderedUI}
    </Grid>
  );
}

export default ClientsCards;
