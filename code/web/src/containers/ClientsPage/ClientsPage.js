import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import NewClient from '../../components/Clients/NewClient/NewClient';

class ClientsPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <NewClient />
        </Grid>
        <Grid item xs={12}>
          <ClientsCards />
        </Grid>
      </Grid>
    );
  }
}

export default ClientsPage;
