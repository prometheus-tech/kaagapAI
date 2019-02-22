import React from 'react';

import Grid from '@material-ui/core/Grid';
import ClientCard from './ClientCard/ClientCard';

function ClientsCards(props) {
  let clients = null;

  if (props.clients.length > 0) {
    clients = props.clients.map(client => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
          <ClientCard
            firstName={client.firstName}
            lastName={client.lastName}
            numberOfSessions={client.numberOfSessions}
          />
        </Grid>
      );
    });
  }

  return (
    <Grid container spacing={24}>
      {clients}
    </Grid>
  );
}

export default ClientsCards;
