import React, { Component } from 'react';

import { logout } from '../../util/helperFunctions';

import { Query } from 'react-apollo';
import CLIENTS from '../../graphql/queries/clients';

import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ClientCards from '../../components/Clients/ClientCards/ClientCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import { lightBlue } from '@material-ui/core/colors';
import SearchField from '../../components/UI/SearchField/SearchField';
import ViewControl from '../../components/UI/ViewControl/ViewControl';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import EditClientDialog from '../../components/Clients/EditClientDialog/EditClientDialog';
import blue from '@material-ui/core/colors/blue';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';

const styles = theme => ({
  container: {
    paddingBottom: theme.spacing.unit * 10,
    width: '100vw'
  },
  controls: {
    marginBottom: theme.spacing.unit * 4
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: lightBlue[600],
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      boxShadow: theme.shadows[10]
    },
    zIndex: 2
  },
  extendedButton: {
    background: '#0091ea',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: blue[900],
      boxShadow: theme.shadows[10]
    },
    margin: theme.spacing.unit,
    padding: '5px 25px 5px 25px'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ClientsPage extends Component {
  state = {
    isNewClientDialogOpened: false,
    isEditClientDialogOpened: false,
    selectedClient: {
      c_id: '',
      fname: '',
      lname: '',
      gender: '',
      birthdate: '',
      no_of_sessions: ''
    },
    view: 'card'
  };

  changeViewHandler = updatedView => {
    this.setState({
      view: updatedView
    });
  };

  openNewClientDialogHandler = () => {
    this.setState({
      isNewClientDialogOpened: true
    });
  };

  closeNewClientDialogHandler = () => {
    this.setState({
      isNewClientDialogOpened: false
    });
  };

  openEditClientDialogHandler = client => {
    this.setState({
      isEditClientDialogOpened: true,
      selectedClient: {
        c_id: client.c_id,
        fname: client.fname,
        lname: client.lname,
        gender: client.gender,
        birthdate: client.birthdate,
        no_of_sessions: client.no_of_sessions
      }
    });
  };

  closeEditClientDialogHandler = () => {
    this.setState({
      isEditClientDialogOpened: false
    });
  };

  render() {
    const { classes } = this.props;

    const {
      isNewClientDialogOpened,
      isEditClientDialogOpened,
      selectedClient,
      view
    } = this.state;

    return (
      <Query query={CLIENTS} errorPolicy="all">
        {({ client, loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            logout(client);
            return <Redirect to="/signin" />;
          }

          return (
            <div className={classes.container}>
              <Grid container>
                <Grid item xs={12} className={classes.controls}>
                  <Grid container alignItems="center">
                    <Grid item md={6}>
                      <Hidden smDown>
                        <Fab
                          color="primary"
                          variant="extended"
                          className={classes.extendedButton}
                          onClick={this.openNewClientDialogHandler}
                        >
                          <Add className={classes.extendedIcon} /> New Client
                        </Fab>
                      </Hidden>
                      <Hidden mdUp>
                        <Fab
                          size="large"
                          color="primary"
                          className={classes.floatingButton}
                          onClick={this.openNewClientDialogHandler}
                          disableRipple={false}
                          disableFocusRipple={false}
                        >
                          <Add />
                        </Fab>
                      </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                      <div className={classes.controlsContainer}>
                        <SearchField placeholder="Search client..." />
                        <ViewControl
                          view={this.state.view}
                          viewChanged={this.changeViewHandler}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {view === 'card' ? (
                <ClientCards
                  clients={data.clients}
                  clientEdited={this.openEditClientDialogHandler}
                  clientDeleted={this.openDeleteClientDialogHandler}
                />
              ) : (
                <ClientsList
                  clients={data.clients}
                  clientEdited={this.openEditClientDialogHandler}
                />
              )}
              <NewClientDialog
                opened={isNewClientDialogOpened}
                closed={this.closeNewClientDialogHandler}
              />
              <EditClientDialog
                opened={isEditClientDialogOpened}
                closed={this.closeEditClientDialogHandler}
                client={selectedClient}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ClientsPage);
