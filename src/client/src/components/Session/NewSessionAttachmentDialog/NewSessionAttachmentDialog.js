import React, { useMemo } from 'react';

import { Mutation } from 'react-apollo';
import UPLOAD_SESSION_ATTACHMENT from '../../../graphql/mutations/uploadSessionAttachment';
import SESSION from '../../../graphql/queries/session';
import { cloneDeep } from 'apollo-utilities';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIllustration from '../../../assets/Upload_Illustration.svg';

import { withSnackbar } from 'notistack';
import {
  toHumanFileSize,
  getSessionDocumentIcon
} from '../../../util/helperFunctions';

const styles = theme => ({
  section: {
    minWidth: '100%'
  },
  dropzone: {
    minWidth: '100%',
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoTextContainer: {
    textAlign: 'center',
    padding: theme.spacing.unit * 4
  },
  infoText: {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit * 2
  },
  instructionText: {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit * 3
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
  },
  grid: {
    paddingRight: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1
  },
  uploadIllustration: {
    height: '25vh'
  },
  uploadDialog: {
    textAlign: 'center'
  },
  selectFileButton: {
    borderRadius: '30px',
    padding: '10px 20px 10px 20px'
  }
});

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose, isLoading } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose && !isLoading ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 0,
    minWidth: '600px',
    overflow: 'hidden'
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const baseStyle = {
  minWidth: '100%'
};

const activeStyle = {
  backgroundColor: '#f6f6f6'
};

const acceptStyle = {
  backgroundColor: '#f1f8e9'
};

const rejectStyle = {
  backgroundColor: '#ffebee'
};

function NewSessionAttachmentDialog(props) {
  const {
    opened,
    closed,
    fileAdded,
    fileRemoved,
    file,
    sessionId,
    classes
  } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDropAccepted: ([file]) => {
      fileAdded(file);
    },
    multiple: false,
    accept: [
      'image/png',
      'image/jpeg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'text/plain',
      'audio/*'
    ],
    maxFile: 10000000 // 10 MB in bytes
  });

  const dropzoneStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  let avatarIconClass = '';
  let iconColor = '';

  if (file) {
    const extensionType = file.name.split('.')[1];

    avatarIconClass = getSessionDocumentIcon(extensionType).avatarIconClass;
    iconColor = getSessionDocumentIcon(extensionType).iconColor;
  }

  return (
    <Mutation
      mutation={UPLOAD_SESSION_ATTACHMENT}
      update={(cache, { data: { uploadSessionAttachment } }) => {
        const { session } = cloneDeep(
          cache.readQuery({
            query: SESSION,
            variables: {
              session_id: sessionId
            }
          })
        );

        session.documents.push(uploadSessionAttachment);

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
        const { file_name } = data.uploadSessionAttachment;

        props.enqueueSnackbar(
          'Session attachment "' + file_name + '" successfully added!'
        );

        closed();
      }}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {(uploadSessionAttachment, { loading }) => {
        return (
          <Dialog open={opened} fullWidth maxWidth="sm">
            <DialogTitle onClose={closed} isLoading={loading}>
              New Attachment Upload
            </DialogTitle>
            <DialogContent className={classes.uploadDialog}>
              <section {...getRootProps({ style: dropzoneStyle })}>
                {file ? null : (
                  <div className={classes.dropzone}>
                    <input {...getInputProps()} />
                    <div>
                      <img
                        src={UploadIllustration}
                        className={classes.uploadIllustration}
                        alt="Upload"
                      />
                      <div className={classes.infoTextContainer}>
                        <Typography
                          variant="body1"
                          className={classes.instructionText}
                        >
                          Attachments will not be analyzed by kaagapAI. These
                          may be supporting documents such as images, videos,
                          and audio recordings.
                        </Typography>
                        <Typography variant="h5" className={classes.infoText}>
                          Drag file here
                        </Typography>
                        <Typography variant="h6" className={classes.infoText}>
                          - or -
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={open}
                          className={classes.selectFileButton}
                        >
                          Select file from your device
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {file ? (
                  <Grid container spacing={16} className={classes.grid}>
                    <Grid item xs={12}>
                      <List>
                        <ListItem>
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
                            {loading ? (
                              <CircularProgress />
                            ) : (
                              <IconButton
                                onClick={() => {
                                  fileRemoved();
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            )}
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                ) : null}
              </section>
            </DialogContent>
            <DialogActions>
              <Button onClick={closed} disabled={loading}>
                Cancel
              </Button>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  uploadSessionAttachment({
                    variables: {
                      file: file,
                      session_id: sessionId
                    }
                  });
                }}
                disabled={loading || !file}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(NewSessionAttachmentDialog));
