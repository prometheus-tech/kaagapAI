import React, { Component } from 'react';

import { Query } from 'react-apollo';
import CLIENTS from '../../graphql/queries/clients';

import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Hidden from '@material-ui/core/Hidden';
import ClientCards from '../../components/Clients/ClientCards/ClientCards';
import NewClientDialog from '../../components/Clients/NewClientDialog/NewClientDialog';
import FloatingActionButton from '../../components/UI/FloatingActionButton/FloatingActionButton';
import EditClientDialog from '../../components/Clients/EditClientDialog/EditClientDialog';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import AppBar from '../../components/Navigation/AppBar/AppBar';
import AddIcon from '@material-ui/icons/Add';
import Main from '../../hoc/Main/Main';
import Placeholder from '../../components/UI/Placeholder/Placeholder';
import EmptyClientsIllustration from '../../assets/Empty_Clients.svg';

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
    }
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
    const {
      isNewClientDialogOpened,
      isEditClientDialogOpened,
      selectedClient
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
              <AppBar
                primaryButtonAction={this.openNewClientDialogHandler}
                primaryButtonLabel="New Client"
                primaryButtonIcon={
                  <AddIcon fontSize="small" style={{ marginRight: '8px' }} />
                }
              />
              <Main>
                {data.clients.length === 0 ? (
                  <Placeholder
                    illustration={EmptyClientsIllustration}
                    alt="No Clients"
                    mainText="Looks like you don't have any clients yet"
                    subText="add a new client to get started"
                  />
                ) : (
                  <ClientCards
                    clients={data.clients}
                    clientEdited={this.openEditClientDialogHandler}
                    clientDeleted={this.openDeleteClientDialogHandler}
                  />
                )}

                <Hidden mdUp>
                  <FloatingActionButton
                    action={this.openNewClientDialogHandler}
                  />
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

export default ClientsPage;
