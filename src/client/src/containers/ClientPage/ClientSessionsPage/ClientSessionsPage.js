import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import orange from '@material-ui/core/colors/orange';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import SessionCards from '../../../components/Client/SessionCards/SessionCards';
import NewSessionDialog from '../../../components/Client/NewSessionDialog/NewSessionDialog';
import EditSessionDialog from '../../../components/Client/EditSessionDialog/EditSessionDialog';
import Placeholder from '../../../components/UI/Placeholder/Placeholder';
import EmptySessionsIllustration from '../../../assets/empty_session.svg';
import Hidden from '@material-ui/core/Hidden';
import FloatingActionButton from '../../../components/UI/FloatingActionButton/FloatingActionButton';

const styles = theme => ({
  floatingButton: {
    zIndex: 1,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: orange[800],
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      backgroundColor: orange[800],
      boxShadow: theme.shadows[10]
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ClientSessionsPage extends Component {
  state = {
    isEditSessionDialogOpened: false,
    selectedSession: {
      session_id: '',
      session_name: '',
      date_of_session: ''
    }
  };

  openEditSessionDialogHandler = session => {
    this.setState({
      isEditSessionDialogOpened: true,
      selectedSession: {
        session_id: session.session_id,
        session_name: session.session_name,
        date_of_session: session.date_of_session
      }
    });
  };

  closeEditSessionDialogHandler = () => {
    this.setState({
      isEditSessionDialogOpened: false
    });
  };

  render() {
    const {
      sessions,
      clientId,
      newSessionDialogClosed,
      isNewSessionDialogOpened,
      newSessionDialogOpened
    } = this.props;

    const { isEditSessionDialogOpened, selectedSession } = this.state;

    return (
      <Auxilliary>
        {sessions.length === 0 ? (
          <Placeholder
            illustration={EmptySessionsIllustration}
            alt="Empty Sessions"
            mainText="This client has no sessions yet"
            subText="Create a new session folder"
          />
        ) : (
          <SessionCards
            sessions={sessions}
            sessionEdited={this.openEditSessionDialogHandler}
          />
        )}
        <Hidden mdUp>
          <FloatingActionButton action={newSessionDialogOpened} />
        </Hidden>
        <NewSessionDialog
          clientId={clientId}
          opened={isNewSessionDialogOpened}
          closed={newSessionDialogClosed}
        />
        <EditSessionDialog
          isOpened={isEditSessionDialogOpened}
          closed={this.closeEditSessionDialogHandler}
          session={selectedSession}
        />
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(ClientSessionsPage);
