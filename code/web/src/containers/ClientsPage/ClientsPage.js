import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';

const styles = theme => ({
  controls: {
    marginBottom: theme.spacing.unit * 4
  }
});

class ClientsPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} className={classes.controls}>
          <Grid container>
            <Grid item>
              <NewClientDialog />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ClientsCards />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ClientsPage);
