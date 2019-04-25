import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';

import { cloneDeep } from 'apollo-utilities';
import DELETE_SESSION_DOCUMENT from '../../../graphql/mutations/deleteSessionDocument';
import SESSION from '../../../graphql/queries/session';
import RESULTS from '../../../graphql/queries/results';
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
import EmptyDocumentIllustration from '../../../components/UI/Placeholder/EmptyDocuments';

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
  render() {
    const {
      classes,
      session_id,
      documents,
      isNewSessionDocumentDialogOpened,
      file,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      isMoreActionsOpened,
      anchorEl,
      selectedSessionDocument,
      isRenameSessionDocumentDialogOpened,
      newSessionDocumentDialogOpened,
      contentSessionDocumentDialogOpened,
      moreActionsOpened,
      newSessionDocumentDialogClosed,
      newUploadFileAdded,
      newUploadFileRemoved,
      moreActionsClosed,
      contentEdited,
      sessionDocumentRenameDialogOpened,
      contentSessionDocumentDialogClosed,
      contentEditStopped,
      selectedSessionDocumentUpdated,
      sessionDocumentRenameDialogClosed
    } = this.props;

    return (
      <Auxilliary>
        {documents.length > 0 ? (
          <div>
            <Hidden smDown>
              <Fab
                color="primary"
                variant="extended"
                className={classes.extendedButton}
                onClick={newSessionDocumentDialogOpened}
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
                onClick={newSessionDocumentDialogOpened}
                disableRipple={false}
                disableFocusRipple={false}
              >
                <Add />
              </Fab>
            </Hidden>
          </div>
        ) : null}
        {documents.length === 0 ? (
          <EmptyDocumentIllustration
            newUploadDocuments={newSessionDocumentDialogOpened}
          />
        ) : (
          <SessionDocumentCards
            sessionDocuments={documents}
            sessionDocumentViewed={contentSessionDocumentDialogOpened}
            moreActionsOpened={moreActionsOpened}
          />
        )}
        <NewSessionDocumentDialog
          opened={isNewSessionDocumentDialogOpened}
          closed={newSessionDocumentDialogClosed}
          file={file}
          fileAdded={newUploadFileAdded}
          fileRemoved={newUploadFileRemoved}
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
              refetchQueries={() => {
                return [{ query: RESULTS, variables: { session_id } }];
              }}
              awaitRefetchQueries={true}
            >
              {deleteSessionDocument => (
                <SessionDocumentMoreActionsPopper
                  isMoreActionsOpened={isMoreActionsOpened}
                  anchorEl={anchorEl}
                  moreActionsClosed={moreActionsClosed}
                  sessionDocumentViewed={contentSessionDocumentDialogOpened}
                  contentEdited={contentEdited}
                  sessionDocumentRenamed={sessionDocumentRenameDialogOpened}
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
            <RenameSessionDocumentDialog
              opened={isRenameSessionDocumentDialogOpened}
              closed={sessionDocumentRenameDialogClosed}
              sessionDocument={selectedSessionDocument}
              selectedSessionDocumentUpdated={selectedSessionDocumentUpdated}
            />
          </Auxilliary>
        ) : null}
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(withSnackbar(SessionDocumentsPage));
