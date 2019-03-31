import React, { Component } from 'react';

import { USER_ID } from '../../util/constants';

import { Query } from 'react-apollo';
import CLIENTS from '../../graphql/queries/clients';

import { withStyles } from '@material-ui/core/styles';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ClientCard from '../../components/Clients/ClientCard/ClientCard';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import SearchField from '../../components/UI/SearchField/SearchField';
import ViewControl from '../../components/UI/ViewControl/ViewControl';

const styles = theme => ({
  mainContainer: {
    paddingBottom: theme.spacing.unit * 10
  },
  controls: {
    marginBottom: theme.spacing.unit * 6
  }
});

class ClientsPage extends Component {
  state = {
    view: 'card'
  };

  changeViewHandler = updatedView => {
    this.setState({
      view: updatedView
    });
  };

  render() {
    const { classes } = this.props;

    const p_id = parseInt(localStorage.getItem(USER_ID));

    return (
      <Query query={CLIENTS} variables={{ p_id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>; // replace later
          }

          return (
            <Grid container className={classes.mainContainer}>
              <Grid item xs={12} className={classes.controls}>
                <Grid container alignItems="center">
                  <Grid item md={3}>
                    <NewClientDialog />
                  </Grid>
                  <Grid item xs={12} sm={8} md={6}>
                    <SearchField label="client" />
                  </Grid>
                  <Hidden xsDown>
                    <Grid item sm={4} md={3} align="right">
                      <ViewControl
                        view={this.state.view}
                        viewChanged={this.changeViewHandler}
                      />
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={8}>
                  {data.clients.map(client => {
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
                        <ClientCard client={client} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ClientsPage);
