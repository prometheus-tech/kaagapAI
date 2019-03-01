import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

class ClientsPage extends Component {
  render() {
    const clientsView = null;

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
