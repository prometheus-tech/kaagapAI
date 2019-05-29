import React, { Component } from 'react';

import EDIT_SESSION_DOCUMENT from '../../../graphql/mutations/editSessionDocument';
import RESULTS from '../../../graphql/queries/results';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Textarea from 'react-textarea-autosize';

const styles = theme => ({
  textField: {
    width: '100%',
    resize: 'none',
    minHeight: '70vh',
    fontSize: theme.spacing.unit * 2,
    lineHeight: '150%',
    textAlign: 'justify',
    border: '0px',
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
    overflow: 'hidden'
  }
});

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  actionsArea: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center'
  },
  editIcon: {
    marginRight: theme.spacing.unit
  },
  secondaryText: {
    color: theme.palette.grey[600],
    marginRight: theme.spacing.unit * 3
  }
}))(props => {
  const { children, classes, onClose, editing, contentEdited } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      <div className={classes.actionsArea}>
        {editing ? (
          <Typography variant="subtitle1" className={classes.secondaryText}>
            Editing...
          </Typography>
        ) : (
          <IconButton
            aria-label="Edit"
            className={classes.editIcon}
            onClick={contentEdited}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 0
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class ContentSessionDocumentDialog extends Component {
  constructor(props) {
    super(props);

    const {
      sd_id,
      file_name,
      date_added,
      type,
      content,
      should_analyze
    } = props.sessionDocument;

    this.state = {
      sd_id,
      file_name,
      date_added,
      type,
      content,
      should_analyze
    };
  }

  componentWillReceiveProps({
    sessionDocument: {
      sd_id,
      file_name,
      date_added,
      type,
      content,
      should_analyze
    }
  }) {
    this.setState({
      sd_id,
      file_name,
      date_added,
      type,
      content,
      should_analyze
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      opened,
      closed,
      editing,
      selectedSessionDocumentUpdated,
      contentEdited,
      contentEditStopped,
      classes,
      session_id
    } = this.props;

    const {
      sd_id,
      file_name,
      date_added,
      type,
      content,
      should_analyze
    } = this.state;

    const updatedSessionDocument = {
      sd_id: sd_id,
      file_name: file_name,
      date_added: date_added,
      type: type,
      content: content,
      should_analyze: should_analyze
    };

    return (
      <Mutation
        mutation={EDIT_SESSION_DOCUMENT}
        optimisticResponse={{
          __typename: 'Mutation',
          editSessionDocument: {
            __typename: 'SessionDocument',
            ...updatedSessionDocument,
            session_id: session_id
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
        {editSessionDocument => {
          return (
            <Dialog open={opened} fullWidth maxWidth="md" scroll="paper">
              <DialogTitle
                onClose={closed}
                editing={editing}
                contentEdited={contentEdited}
                contentEditStopped={contentEditStopped}
                editSessionDocument={editSessionDocument}
              >
                {file_name}
              </DialogTitle>
              <DialogContent>
                <Textarea
                  value={content}
                  rowsmax={Infinity}
                  disabled={!editing}
                  className={classes.textField}
                  name="content"
                  onChange={this.inputChangeHandler}
                />
              </DialogContent>
              {editing ? (
                <DialogActions>
                  <Button
                    style={{ marginRight: '8px' }}
                    onClick={contentEditStopped}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      editSessionDocument({
                        variables: {
                          sd_id,
                          content,
                          file_name
                        }
                      });

                      selectedSessionDocumentUpdated({
                        ...updatedSessionDocument
                      });

                      contentEditStopped();
                    }}
                  >
                    Save changes
                  </Button>
                </DialogActions>
              ) : null}
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(ContentSessionDocumentDialog);
