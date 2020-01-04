import React, { Component } from 'react';

import { loadCSS } from 'fg-loadcss/src/loadCSS';

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
    checkedSessions: [],
    analyzedSessions: [],
    isNewSessionDialogOpened: false,
    isSelectSessionsDialogOpened: false
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  changeTabValueHandler = (e, value) => {
    if (this.state.tabValue !== value) {
      this.setState({ tabValue: value });
    }
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

  toggleCheckedSessionHandler = sessionId => {
    const currentIndex = this.state.checkedSessions.indexOf(sessionId);

    const newCheckedSessions = [...this.state.checkedSessions];

    if (currentIndex === -1) {
      newCheckedSessions.push(sessionId);
    } else {
      newCheckedSessions.splice(currentIndex, 1);
    }

    this.setState({
      checkedSessions: newCheckedSessions
    });
  };

  changeAnalyzedSessions = () => {
    const newAnalyzedSessions = [...this.state.checkedSessions];

    this.setState({
      analyzedSessions: newAnalyzedSessions
    });
  };

  render() {
    const { c_id } = this.props.match.params;

    const {
      tabValue,
      isNewSessionDialogOpened,
      isSelectSessionsDialogOpened,
      checkedSessions,
      analyzedSessions
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
                  tabValueChanged={this.changeTabValueHandler}
                />
              ) : null}

              <Main>
                {tabValue === 0 && (
                  <ClientSessionsPage
                    sessions={data.client.sessions}
                    clientId={c_id}
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
                    checkedSessions={checkedSessions}
                    analyzedSessions={analyzedSessions}
                    checkSessionsToggled={this.toggleCheckedSessionHandler}
                    analyzeSessions={this.changeAnalyzedSessions}
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
