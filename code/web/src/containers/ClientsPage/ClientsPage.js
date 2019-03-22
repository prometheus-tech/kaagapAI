import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import SearchField from '../../components/UI/SearchField/SearchField';
import ViewControl from '../../components/UI/ViewControl/ViewControl';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';

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
          {this.state.view === 'card' ? <ClientsCards /> : <ClientsList />}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ClientsPage);
