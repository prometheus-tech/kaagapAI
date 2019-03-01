import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';

class ClientsPage extends Component {
  render() {
    const clientsView = <ClientsCards />;

    return (
      <Grid container>
        <Grid item xs={12}>
          {clientsView}
        </Grid>
      </Grid>
    );
  }
}

export default ClientsPage;
