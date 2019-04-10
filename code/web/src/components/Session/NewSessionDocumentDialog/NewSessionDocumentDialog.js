import React, { createRef } from 'react';

import { Mutation } from 'react-apollo';
import ADD_SESSION_DOCUMENT from '../../../graphql/mutations/addSessionDocument';
import SESSION from '../../../graphql/queries/session';
import { cloneDeep } from 'apollo-utilities';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dropzone from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';

import { withSnackbar } from 'notistack';
import { toHumanFileSize } from '../../../util/helperFunctions';
import SimpleSnackbar from '../../UI/SimpleSnackbar/SimpleSnackbar';

const styles = theme => ({
  section: {
    minWidth: '600px',
    minHeight: '300px'
  },
  dropzone: {
    minWidth: '600px',
    minHeight: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed #d3d3d3',
    marginBottom: theme.spacing.unit * 2
  },
  infoTextContainer: {
    textAlign: 'center'
  },
  infoText: {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
    backgroundColor: 'transparent',
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 8,
    textAlign: 'center'
  }
});

function NewSessionDocumentDialog(props) {
  const {
    opened,
    closed,
    filesAdded,
    fileRemoved,
    files,
    sessionId,
    classes
  } = props;

  const dropzoneRef = createRef();
  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  return (
    <Mutation
      mutation={ADD_SESSION_DOCUMENT}
      update={(cache, { data: { uploadSessionDocument } }) => {
        const { session } = cloneDeep(
          cache.readQuery({
            query: SESSION,
            variables: {
              session_id: sessionId
            }
          })
        );

        session.documents.push(uploadSessionDocument);

        cache.writeQuery({
          query: SESSION,
          variables: {
            session_id: sessionId
          },
          data: {
            session
          }
        });
      }}
      onCompleted={data => {
        const { file_name } = data.uploadSessionDocument;

        props.enqueueSnackbar(
          'Session document "' + file_name + '" successfully added!'
        );
      }}
    >
      {(addSessionDocument, { loading }) => {
        if (loading) {
          return (
            <SimpleSnackbar
              message="Uploading document..."
              isOpened={loading}
            />
          );
        }

        return (
          <Dialog open={opened} onClose={closed} maxWidth="lg">
            <DialogTitle>New Session Document Upload</DialogTitle>
            <DialogContent>
              <Dropzone
                ref={dropzoneRef}
                noClick
                noKeyboard
                onDrop={files => {
                  filesAdded(files);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section {...getRootProps({ className: classes.section })}>
                    <input {...getInputProps()} />
                    {files.length === 0 ? (
                      <div className={classes.dropzone}>
                        <div className={classes.infoTextContainer}>
                          <Typography variant="h5" className={classes.infoText}>
                            Drag files here
                          </Typography>
                          <Typography variant="h6" className={classes.infoText}>
                            - or -
                          </Typography>
                          <Button variant="contained" onClick={openDialog}>
                            Select files from your device
                          </Button>
                        </div>
                      </div>
                    ) : null}
                    <Grid container spacing={16} className={classes.grid}>
                      <Grid item xs={12}>
                        <List>
                          {files.map((file, index) => {
                            const extensionType = file.name.split('.')[1];
                            let avatarIconClass = '';
                            let iconColor = '';

                            if (extensionType === 'pdf') {
                              avatarIconClass = 'fas fa-file-pdf';
                              iconColor = 'blue';
                            } else if (extensionType === 'txt') {
                              avatarIconClass = 'fas fa-file-alt';
                              iconColor = 'red';
                            } else if (
                              extensionType === 'doc' ||
                              extensionType === 'docx'
                            ) {
                              avatarIconClass = 'fas fa-file-word';
                              iconColor = 'green';
                            } else if (
                              extensionType === 'wav' ||
                              extensionType === 'mp4'
                            ) {
                              avatarIconClass = 'fas fa-file-audio';
                              iconColor = 'yellow';
                            } else {
                              avatarIconClass = 'fas fa-file-alt';
                              iconColor = 'black';
                            }

                            return (
                              <ListItem key={index}>
                                <ListItemAvatar>
                                  <Icon
                                    fontSize="large"
                                    className={avatarIconClass}
                                    style={{ color: iconColor }}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={file.name}
                                  secondary={toHumanFileSize(file.size)}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    onClick={() => {
                                      fileRemoved(index);
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                      {files.length > 0 ? (
                        <Grid item xs={12}>
                          <Button variant="contained" onClick={openDialog}>
                            Add More Files
                          </Button>
                        </Grid>
                      ) : null}
                    </Grid>
                  </section>
                )}
              </Dropzone>
            </DialogContent>
            <DialogActions>
              <Button onClick={closed}>Cancel</Button>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  closed();
                  addSessionDocument({
                    variables: {
                      file: files,
                      session_id: sessionId
                    }
                  });
                }}
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(NewSessionDocumentDialog));
