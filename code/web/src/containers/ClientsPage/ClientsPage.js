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
import { lightBlue } from '@material-ui/core/colors';
import SearchField from '../../components/UI/SearchField/SearchField';
import ViewControl from '../../components/UI/ViewControl/ViewControl';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import DeleteClientDialog from '../../components/Clients/DeleteClientDialog/DeleteClientDialog';
import EditClientDialog from '../../components/Clients/EditClientDialog/EditClientDialog';

const styles = theme => ({
  mainContainer: {
    paddingBottom: theme.spacing.unit * 10
  },
  controls: {
    marginBottom: theme.spacing.unit * 6
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
    background: 'rgb(109, 84, 248)',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
    },
    margin: theme.spacing.unit,
    padding: '5px 25px 5px 25px'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ClientsPage extends Component {
  state = {
    isNewClientDialogOpened: false,
    isDeleteClientDialogOpened: false,
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

  openDeleteClientDialogHandler = client => {
    this.setState({
      isDeleteClientDialogOpened: true,
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

  closeDeleteClientDialogHandler = () => {
    this.setState({
      isDeleteClientDialogOpened: false
    });
  };

  render() {
    const { classes } = this.props;

    const {
      isNewClientDialogOpened,
      isEditClientDialogOpened,
      isDeleteClientDialogOpened,
      selectedClient
    } = this.state;

    const p_id = localStorage.getItem(USER_ID);

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
            <Auxilliary>
              <Grid container className={classes.mainContainer}>
                <Grid item xs={12} className={classes.controls}>
                  <Grid container alignItems="center">
                    <Grid item md={3}>
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
                          <ClientCard
                            clientEdited={this.openEditClientDialogHandler}
                            clientDeleted={this.openDeleteClientDialogHandler}
                            client={client}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
              <NewClientDialog
                practitionerId={p_id}
                opened={isNewClientDialogOpened}
                closed={this.closeNewClientDialogHandler}
              />
              <EditClientDialog
                opened={isEditClientDialogOpened}
                closed={this.closeEditClientDialogHandler}
                client={selectedClient}
              />
              <DeleteClientDialog
                opened={isDeleteClientDialogOpened}
                closed={this.closeDeleteClientDialogHandler}
                practitionerId={p_id}
                client={selectedClient}
              />
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ClientsPage);
