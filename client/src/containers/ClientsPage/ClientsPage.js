import React, { Component } from 'react';

import { Query } from 'react-apollo';
import CLIENTS from '../../graphql/queries/clients';

import { withStyles } from '@material-ui/core/styles';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Hidden from '@material-ui/core/Hidden';
import ClientCards from '../../components/Clients/ClientCards/ClientCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import { lightBlue } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import EditClientDialog from '../../components/Clients/EditClientDialog/EditClientDialog';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';
import EmptyClient from '../../components/UI/Placeholder/EmptyClient';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import MyHeader from '../../components/Navigation/MyHeader/MyHeader';
import AddIcon from '@material-ui/icons/Add';
import Main from '../../hoc/Main/Main';
import ClientsSubHeader from '../../components/Clients/ClientsSubHeader/ClientsSubHeader';

const styles = theme => ({
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
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <div />;
          }

          return (
            <Auxilliary>
              <MyHeader
                primaryButtonAction={this.openNewClientDialogHandler}
                primaryButtonLabel="New Client"
                primaryButtonIcon={
                  <AddIcon fontSize="small" style={{ marginRight: '8px' }} />
                }
              />

              {data.clients.length > 0 ? (
                <ClientsSubHeader
                  view={view}
                  viewChanged={this.changeViewHandler}
                  searchPlaceholder="Search client..."
                />
              ) : null}

              <Main>
                {data.clients.length === 0 ? (
                  <EmptyClient
                    newClientsOpened={this.openNewClientDialogHandler}
                  />
                ) : view === 'card' && data.clients.length > 0 ? (
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

                <NewClientDialog
                  opened={isNewClientDialogOpened}
                  closed={this.closeNewClientDialogHandler}
                />

                <EditClientDialog
                  opened={isEditClientDialogOpened}
                  closed={this.closeEditClientDialogHandler}
                  client={selectedClient}
                />
              </Main>
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ClientsPage);