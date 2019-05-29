import React, { Component } from 'react';

import { withSnackbar } from 'notistack';

import { cloneDeep } from 'apollo-utilities';
import DELETE_SESSION_DOCUMENT from '../../../graphql/mutations/deleteSessionDocument';
import SESSION from '../../../graphql/queries/session';
import RESULTS from '../../../graphql/queries/results';
import { Mutation } from 'react-apollo';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import SessionDocumentCards from '../../../components/Session/SessionDocumentCards/SessionDocumentCards';
import NewSessionDocumentDialog from '../../../components/Session/NewSessionDocumentDialog/NewSessionDocumentDialog';
import SessionDocumentMoreActionsPopper from '../../../components/Session/SessionDocumentMoreActionsPopper/SessionDocumentMoreActionsPopper';
import RenameSessionDocumentDialog from '../../../components/Session/RenameSessionDocumentDialog/RenameSessionDocumentDialog';
import EmptyDocumentIllustration from '../../../components/UI/Placeholder/EmptyDocuments';
import ContentSessionDocumentDialog from '../../../components/Session/ContentSessionDocumentDialog/ContentSessionDocumentDialog';

class SessionDocumentsPage extends Component {
  render() {
    const {
      session_id,
      documents,
      isNewSessionDocumentDialogOpened,
      file,
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
      selectedSessionDocumentUpdated,
      sessionDocumentRenameDialogClosed,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      contentSessionDocumentDialogClosed,
      contentEditStopped
    } = this.props;

    return (
      <Auxilliary>
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
          <ContentSessionDocumentDialog
            opened={isContentSessionDocumentDialogOpened}
            closed={contentSessionDocumentDialogClosed}
            editing={isEditContentSessionDocument}
            sessionDocument={selectedSessionDocument}
            contentEdited={contentEdited}
            contentEditStopped={contentEditStopped}
            selectedSessionDocumentUpdated={selectedSessionDocumentUpdated}
            session_id={session_id}
          />
        ) : null}

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
                  session_id: selectedSessionDocument.session_id,
                  sd_id: selectedSessionDocument.sd_id,
                  file_name: selectedSessionDocument.file_name,
                  date_added: selectedSessionDocument.date_added,
                  type: selectedSessionDocument.type,
                  content: selectedSessionDocument.content
                }
              }}
              refetchQueries={() => {
                return [{ query: RESULTS, variables: { session_id } }];
              }}
              awaitRefetchQueries={true}
              errorPolicy="all"
              onError={error => {
                // Ignore error
              }}
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

export default withSnackbar(SessionDocumentsPage);
