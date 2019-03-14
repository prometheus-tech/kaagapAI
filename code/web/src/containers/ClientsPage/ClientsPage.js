import React, { Component } from 'react';

import { USER_ID } from '../../util/constants';

import CLIENTS from '../../graphql/queries/clients';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import SearchField from '../../components/UI/SearchField/SearchField';

const styles = theme => ({
  controls: {
    marginBottom: theme.spacing.unit * 6
  }
});

class ClientsPage extends Component {
  render() {
    const p_id = parseInt(localStorage.getItem(USER_ID));

    const { classes } = this.props;

    return (
      <Query query={CLIENTS} variables={{ p_id }}>
        {({ loading, error, data }) => {
          if (loading) {
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
                  <CircularProgress />
                </Grid>
              </Grid>
            );
          }

          if (error) {
            return <p>Error</p>;
          }

          return (
            <Grid container>
              {!loading ? (
                <Grid item xs={12} className={classes.controls}>
                  <Grid container alignItems="center">
                    <Grid item md={3}>
                      <NewClientDialog />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                      <SearchField label="client" />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <ClientsCards clients={data.getClients} />
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ClientsPage);
