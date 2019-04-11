import React from 'react';

import Grid from '@material-ui/core/Grid';
import ClientCard from './ClientCard/ClientCard';

function ClientCards({ clients, clientEdited, clientDeleted }) {
  return (
    <Grid container spacing={8}>
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
            <ClientCard
              clientEdited={clientEdited}
              clientDeleted={clientDeleted}
              client={client}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ClientCards;
