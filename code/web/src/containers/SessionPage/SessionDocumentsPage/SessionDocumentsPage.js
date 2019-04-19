import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';

import { cloneDeep } from 'apollo-utilities';
import DELETE_SESSION_DOCUMENT from '../../../graphql/mutations/deleteSessionDocument';
import SESSION from '../../../graphql/queries/session';
import { Mutation } from 'react-apollo';

import purple from '@material-ui/core/colors/purple';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Add from '@material-ui/icons/Add';
import SessionDocumentCards from '../../../components/Session/SessionDocumentCards/SessionDocumentCards';
import NewSessionDocumentDialog from '../../../components/Session/NewSessionDocumentDialog/NewSessionDocumentDialog';
import SessionDocumentMoreActionsPopper from '../../../components/Session/SessionDocumentMoreActionsPopper/SessionDocumentMoreActionsPopper';
import ContentSessionDocumentDialog from '../../../components/Session/ContentSessionDocumentDialog/ContentSessionDocumentDialog';
import RenameSessionDocumentDialog from '../../../components/Session/RenameSessionDocumentDialog/RenameSessionDocumentDialog';

const styles = theme => ({
  extendedButton: {
    background: purple[500],
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: purple[700],
      boxShadow: theme.shadows[10]
    },
    padding: '5px 25px 5px 25px',
    marginBottom: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      boxShadow: theme.shadows[10]
    }
  }
});

class SessionDocumentsPage extends Component {
  state = {
    isNewSessionDocumentDialogOpened: false,
    file: null,
    selectedSessionDocument: null,
    isMoreActionsOpened: false,
    anchorEl: null,
    isContentSessionDocumentDialogOpened: false,
    isEditContentSessionDocument: false,
    isRenameSessionDocumentDialogOpened: false
  };

  openNewSessionDocumentDialogHandler = () => {
    this.setState({
      isNewSessionDocumentDialogOpened: true
    });
  };

  closeNewSessionDocumentDialogHandler = () => {
    this.setState({ isNewSessionDocumentDialogOpened: false, file: null });
  };

  addFile = file => {
    this.setState({
      file
    });
  };

  clearFile = () => {
    this.setState({
      file: null
    });
  };

  openMoreActionsHandler = (event, sessionDocument) => {
    const { currentTarget } = event;
    this.setState({
      isMoreActionsOpened: true,
      anchorEl: currentTarget,
      selectedSessionDocument: sessionDocument
    });
  };

  closeMoreActionsHandler = () => {
    this.setState({ isMoreActionsOpened: false });
  };

  openContentSessionDocumentDialog = sessionDocument => {
    if (sessionDocument) {
      this.setState({
        isContentSessionDocumentDialogOpened: true,
        selectedSessionDocument: sessionDocument
      });
    } else {
      this.setState({
        isContentSessionDocumentDialogOpened: true
      });
    }
  };

  closeContentSessionDocumentDialog = () => {
    this.setState({
      isContentSessionDocumentDialogOpened: false,
      isEditContentSessionDocument: false,
      selectedSessionDocument: null
    });
  };

  editContentSessionDocumentHandler = () => {
    this.setState({
      isEditContentSessionDocument: true
    });
  };

  updateSelectedSessionDocumentHandler = sessionDocument => {
    this.setState({
      selectedSessionDocument: sessionDocument
    });
  };

  stopEditContentSessionDocumentHandler = () => {
    this.setState({ isEditContentSessionDocument: false });
  };

  openRenameSessionDocumentHandler = () => {
    this.setState({ isRenameSessionDocumentDialogOpened: true });
  };

  closeRenameSessionDocumentHandler = () => {
    this.setState({ isRenameSessionDocumentDialogOpened: false });
  };

  render() {
    const { classes, session_id, documents } = this.props;

    const {
      isNewSessionDocumentDialogOpened,
      file,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      isMoreActionsOpened,
      anchorEl,
      selectedSessionDocument,
      isRenameSessionDocumentDialogOpened
    } = this.state;

    return (
      <Auxilliary>
        <Hidden smDown>
          <Fab
            color="primary"
            variant="extended"
            className={classes.extendedButton}
            onClick={this.openNewSessionDocumentDialogHandler}
          >
            <Icon className={classes.extendedIcon}>cloud_upload</Icon>
            Upload File
          </Fab>
        </Hidden>
        <Hidden mdUp>
          <Fab
            size="large"
            color="primary"
            className={classes.floatingButton}
            onClick={this.openNewSessionDialogHandler}
            disableRipple={false}
            disableFocusRipple={false}
          >
            <Add />
          </Fab>
        </Hidden>
        <SessionDocumentCards
          sessionDocuments={documents}
          sessionDocumentViewed={this.openContentSessionDocumentDialog}
          moreActionsOpened={this.openMoreActionsHandler}
        />
        <NewSessionDocumentDialog
          opened={isNewSessionDocumentDialogOpened}
          closed={this.closeNewSessionDocumentDialogHandler}
          file={file}
          fileAdded={this.addFile}
          fileRemoved={this.clearFile}
          sessionId={session_id}
        />
        {selectedSessionDocument ? (
          <Auxilliary>
            <Mutation
              mutation={DELETE_SESSION_DOCUMENT}
              update={(
                cache,
                {
                  data: {
                    deleteSessionDocument: { sd_id, file_name }
                  }
                }
              ) => {
                const { session } = cloneDeep(
                  cache.readQuery({
                    query: SESSION,
                    variables: { session_id }
                  })
                );

                session.documents = session.documents.filter(
                  d => d.sd_id !== sd_id
                );

                cache.writeQuery({
                  query: SESSION,
                  variables: { session_id },
                  data: { session }
                });

                this.props.enqueueSnackbar(file_name + ' archived!');
              }}
              optimisticResponse={{
                __typename: 'Mutation',
                deleteSessionDocument: {
                  __typename: 'SessionDocument',
                  sd_id: selectedSessionDocument.sd_id,
                  file_name: selectedSessionDocument.file_name
                }
              }}
            >
              {deleteSessionDocument => (
                <SessionDocumentMoreActionsPopper
                  isMoreActionsOpened={isMoreActionsOpened}
                  anchorEl={anchorEl}
                  moreActionsClosed={this.closeMoreActionsHandler}
                  sessionDocumentViewed={this.openContentSessionDocumentDialog}
                  contentEdited={this.editContentSessionDocumentHandler}
                  sessionDocumentRenamed={this.openRenameSessionDocumentHandler}
                  sessionDocumentDeleted={() => {
                    deleteSessionDocument({
                      variables: {
                        sd_id: selectedSessionDocument.sd_id
                      }
                    });
                  }}
                />
              )}
            </Mutation>
            <ContentSessionDocumentDialog
              opened={isContentSessionDocumentDialogOpened}
              closed={this.closeContentSessionDocumentDialog}
              editing={isEditContentSessionDocument}
              sessionDocument={selectedSessionDocument}
              contentEdited={this.editContentSessionDocumentHandler}
              contentEditStopped={this.stopEditContentSessionDocumentHandler}
              selectedSessionDocumentUpdated={
                this.updateSelectedSessionDocumentHandler
              }
            />
            <RenameSessionDocumentDialog
              opened={isRenameSessionDocumentDialogOpened}
              closed={this.closeRenameSessionDocumentHandler}
              sessionDocument={selectedSessionDocument}
              selectedSessionDocumentUpdated={
                this.updateSelectedSessionDocumentHandler
              }
            />
          </Auxilliary>
        ) : null}
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(withSnackbar(SessionDocumentsPage));
