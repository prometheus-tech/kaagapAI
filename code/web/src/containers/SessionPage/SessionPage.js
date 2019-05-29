import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import SESSION from '../../graphql/queries/session';
import { Query } from 'react-apollo';

import { withSnackbar } from 'notistack';

import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import SessionDocumentsPage from './SessionDocumentsPage/SessionDocumentsPage';
import SessionResultsPage from './SessionResultsPage/SessionResultsPage';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import MyHeader from '../../components/Navigation/MyHeader/MyHeader';
import Main from '../../hoc/Main/Main';
import SessionSubHeader from '../../components/Session/SessionSubHeader/SessionSubHeader';
import UploadFilePopper from '../../components/Session/UploadFilePopper/UploadFilePopper';

class SessionPage extends Component {
  state = {
    tabValue: 0,
    isNewSessionDocumentDialogOpened: false,
    isNewSessionAttachmentDialogOpened: false,
    file: null,
    selectedSessionDocument: null,
    isMoreActionsOpened: false,
    anchorEl: null,
    isContentSessionDocumentDialogOpened: false,
    isEditContentSessionDocument: false,
    isRenameSessionDocumentDialogOpened: false,
    isUploadFilePopperOpened: false,
    uploadFilePopperAnchorEl: null
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

  openNewSessionDocumentDialogHandler = () => {
    this.setState({
      isNewSessionDocumentDialogOpened: true
    });
  };

  closeNewSessionDocumentDialogHandler = () => {
    this.setState({ isNewSessionDocumentDialogOpened: false, file: null });
  };

  openNewSessionAttachmentDialogHandler = () => {
    this.setState({
      isNewSessionAttachmentDialogOpened: true
    });
  };

  closeNewSessionAttachmentDialogHandler = () => {
    this.setState({ isNewSessionAttachmentDialogOpened: false, file: null });
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

  openUploadFilePopperHandler = event => {
    this.setState({
      isUploadFilePopperOpened: true,
      uploadFilePopperAnchorEl: event.currentTarget
    });
  };

  closeUploadFilePopperHandler = () => {
    this.setState({
      isUploadFilePopperOpened: false
    });
  };

  render() {
    const { session_id } = this.props.match.params;

    const {
      tabValue,
      isNewSessionDocumentDialogOpened,
      isNewSessionAttachmentDialogOpened,
      file,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      isMoreActionsOpened,
      anchorEl,
      selectedSessionDocument,
      isRenameSessionDocumentDialogOpened,
      isUploadFilePopperOpened,
      uploadFilePopperAnchorEl
    } = this.state;

    return (
      <Query
        query={SESSION}
        variables={{ session_id: session_id }}
        errorPolicy="all"
      >
        {({
          loading: sessionLoading,
          error: sessionError,
          data: { session }
        }) => {
          if (sessionLoading) {
            return <LoadingFullScreen />;
          }

          if (sessionError) {
            return <div />;
          }

          return (
            <Query
              query={CLIENT}
              variables={{ c_id: session.c_id }}
              errorPolicy="all"
            >
              {({ loading: clientLoading, error: clientError, data }) => {
                if (clientLoading) {
                  return <LoadingFullScreen />;
                }

                if (clientError) {
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
                    path: '/client/' + data.client.c_id,
                    icon: <PersonIcon style={{ marginRight: '8px' }} />
                  },
                  {
                    label: session.session_name,
                    icon: <FolderIcon style={{ marginRight: '8px' }} />
                  }
                ];

                return (
                  <Auxilliary>
                    <MyHeader
                      primaryButtonAction={
                        tabValue === 0 ? this.openUploadFilePopperHandler : null
                      }
                      primaryButtonLabel={tabValue === 0 ? 'Upload' : null}
                      primaryButtonIcon={
                        tabValue === 0 ? (
                          <CloudUploadIcon
                            fontSize="small"
                            style={{ marginRight: '8px' }}
                          />
                        ) : null
                      }
                      breadcrumbData={breadcrumbData}
                    />

                    {session.documents.length > 0 ? (
                      <SessionSubHeader
                        tabValue={tabValue}
                        searchPlaceholder="Search documents..."
                        tabValueChanged={this.changeTabValueHandler}
                      />
                    ) : null}

                    <Main>
                      {tabValue === 0 && (
                        <SessionDocumentsPage
                          session_id={session_id}
                          documents={session.documents}
                          isNewSessionDocumentDialogOpened={
                            isNewSessionDocumentDialogOpened
                          }
                          isNewSessionAttachmentDialogOpened={
                            isNewSessionAttachmentDialogOpened
                          }
                          file={file}
                          isContentSessionDocumentDialogOpened={
                            isContentSessionDocumentDialogOpened
                          }
                          isEditContentSessionDocument={
                            isEditContentSessionDocument
                          }
                          isMoreActionsOpened={isMoreActionsOpened}
                          anchorEl={anchorEl}
                          selectedSessionDocument={selectedSessionDocument}
                          isRenameSessionDocumentDialogOpened={
                            isRenameSessionDocumentDialogOpened
                          }
                          newSessionDocumentDialogOpened={
                            this.openNewSessionDocumentDialogHandler
                          }
                          contentSessionDocumentDialogOpened={
                            this.openContentSessionDocumentDialog
                          }
                          contentSessionDocumentDialogClosed={
                            this.closeContentSessionDocumentDialog
                          }
                          moreActionsOpened={this.openMoreActionsHandler}
                          newSessionDocumentDialogClosed={
                            this.closeNewSessionDocumentDialogHandler
                          }
                          newSessionAttachmentDialogClosed={
                            this.closeNewSessionAttachmentDialogHandler
                          }
                          newUploadFileAdded={this.addFile}
                          newUploadFileRemoved={this.clearFile}
                          moreActionsClosed={this.closeMoreActionsHandler}
                          contentEdited={this.editContentSessionDocumentHandler}
                          sessionDocumentRenameDialogOpened={
                            this.openRenameSessionDocumentHandler
                          }
                          contentEditStopped={
                            this.stopEditContentSessionDocumentHandler
                          }
                          selectedSessionDocumentUpdated={
                            this.updateSelectedSessionDocumentHandler
                          }
                          sessionDocumentRenameDialogClosed={
                            this.closeRenameSessionDocumentHandler
                          }
                        />
                      )}
                      {tabValue === 1 && (
                        <SessionResultsPage
                          session_id={session_id}
                          pageTabValueChanged={this.changeTabValueHandler}
                        />
                      )}
                    </Main>
                    <UploadFilePopper
                      newSessionDocumentDialogOpened={
                        this.openNewSessionDocumentDialogHandler
                      }
                      newSessionAttachmentDialogOpened={
                        this.openNewSessionAttachmentDialogHandler
                      }
                      isUploadFilePopperOpened={isUploadFilePopperOpened}
                      anchorEl={uploadFilePopperAnchorEl}
                      uploadFilePopperClosed={this.closeUploadFilePopperHandler}
                    />
                    {/* {selectedSessionDocument ? (
                      <MyFileViewer sessionDocument={selectedSessionDocument} />
                    ) : null} */}
                  </Auxilliary>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withSnackbar(SessionPage));
