import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import { Query } from 'react-apollo';

import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import CustomSessionsResultPage from './CustomSessionsResultPage/CustomSessionsResultPage';
import ClientSessionsPage from './ClientSessionsPage/ClientSessionsPage';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import MyHeader from '../../components/Navigation/MyHeader/MyHeader';
import Main from '../../hoc/Main/Main';
import AddIcon from '@material-ui/icons/Add';
import ClientSubHeader from '../../components/Client/ClientSubHeader/ClientSubHeader';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import TrendsIcon from '@material-ui/icons/Timeline';

class ClientPage extends Component {
  state = {
    tabValue: 0,
    view: 'card',
    isNewSessionDialogOpened: false,
    isSelectSessionsDialogOpened: false
  };

  changeTabValueHandler = (e, value) => {
    if (this.state.tabValue !== value) {
      this.setState({ tabValue: value });
    }
  };

  changeViewHandler = updatedView => {
    this.setState({
      view: updatedView
    });
  };

  openNewSessionDialogHandler = () => {
    this.setState({
      isNewSessionDialogOpened: true
    });
  };

  closeNewSessionDialogHandler = () => {
    this.setState({
      isNewSessionDialogOpened: false
    });
  };

  openSelectSessionsHandler = () => {
    this.setState({
      isSelectSessionsDialogOpened: true,
      checkedSessions: []
    });
  };

  closeSelectSessionsHandler = () => {
    this.setState({
      isSelectSessionsDialogOpened: false
    });
  };

  render() {
    const { c_id } = this.props.match.params;

    const {
      tabValue,
      view,
      isNewSessionDialogOpened,
      isSelectSessionsDialogOpened
    } = this.state;

    return (
      <Query query={CLIENT} variables={{ c_id: c_id }} errorPolicy="all">
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <div />;
          }

          const breadcrumbData = [
            {
              label: 'Clients',
              path: '/',
              icon: <PeopleIcon style={{ marginRight: '8px' }} />
            },
            {
              label: data.client.fname + ' ' + data.client.lname,
              icon: <PersonIcon style={{ marginRight: '8px' }} />
            }
          ];

          return (
            <Auxilliary>
              <MyHeader
                primaryButtonAction={
                  tabValue === 0
                    ? this.openNewSessionDialogHandler
                    : this.openSelectSessionsHandler
                }
                primaryButtonLabel={
                  tabValue === 0 ? 'New Session' : 'Select Sessions'
                }
                primaryButtonIcon={
                  tabValue === 0 ? (
                    <AddIcon fontSize="small" style={{ marginRight: '8px' }} />
                  ) : (
                    <TrendsIcon
                      fontSize="small"
                      style={{ marginRight: '8px' }}
                    />
                  )
                }
                breadcrumbData={breadcrumbData}
              />

              {data.client.sessions.length > 0 ? (
                <ClientSubHeader
                  tabValue={tabValue}
                  searchPlaceholder="Search sessions..."
                  view={view}
                  viewChanged={this.changeViewHandler}
                  tabValueChanged={this.changeTabValueHandler}
                />
              ) : null}

              <Main>
                {tabValue === 0 && (
                  <ClientSessionsPage
                    sessions={data.client.sessions}
                    clientId={c_id}
                    view={view}
                    isNewSessionDialogOpened={isNewSessionDialogOpened}
                    newSessionDialogClosed={this.closeNewSessionDialogHandler}
                    newSessionDialogOpened={this.openNewSessionDialogHandler}
                  />
                )}
                {tabValue === 1 && (
                  <CustomSessionsResultPage
                    sessions={data.client.sessions}
                    isSelectSessionsDialogOpened={isSelectSessionsDialogOpened}
                    selectSessionsDialogOpened={this.openSelectSessionsHandler}
                    selectSessionsDialogClosed={this.closeSelectSessionsHandler}
                  />
                )}
              </Main>
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ClientPage);
