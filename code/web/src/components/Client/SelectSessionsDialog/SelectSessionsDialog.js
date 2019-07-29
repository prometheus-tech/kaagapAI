import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../../UI/CustomDialogTitle/CustomDialogTitle';
import DialogContent from '../../UI/CustomDialogContent/CustomDialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '../../UI/CustomDialogActions/CustomDialogActions';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import orange from '@material-ui/core/colors/orange';

const styles = theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    color: 'white',
    backgroundColor: orange[800]
  }
});

function SelectSessionsDialog({
  classes,
  opened,
  sessions,
  checkedSessions,
  checkSessionsToggled,
  selectSessionsDialogClosed,
  analyzeSessions
}) {
  return (
    <Dialog open={opened} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle onClose={selectSessionsDialogClosed}>
        Select Sessions to Analyze
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select at least 2 sessions to analyze and view trends and patterns
          across these sessions
        </DialogContentText>
        <List className={classes.list}>
          {sessions.map(session => (
            <ListItem key={session.session_id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <FolderIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={session.session_name}
                secondary={
                  <Moment format="MMM D, YYYY" withTitle>
                    {session.date_of_session}
                  </Moment>
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={checkedSessions.indexOf(session.session_id) !== -1}
                  edge="end"
                  onChange={() => {
                    checkSessionsToggled(session.session_id);
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={selectSessionsDialogClosed}>Cancel</Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => {
            analyzeSessions();
            selectSessionsDialogClosed();
          }}
          disabled={checkedSessions.length < 2}
        >
          Analyze
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(SelectSessionsDialog);
