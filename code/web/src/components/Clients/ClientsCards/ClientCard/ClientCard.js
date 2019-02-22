import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  avatar: {
    backgroundColor: deepOrange[500]
  }
});

function ClientCard(props) {
  const { classes } = props;

  const initials = props.firstName.charAt(0) + props.lastName.charAt(0);
  const name = props.firstName + ' ' + props.lastName;
  const sessions =
    props.numberOfSessions > 0
      ? props.numberOfSessions + ' sessions'
      : 'No sessions yet';

  return (
    <Card>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{initials}</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={sessions}
      />
    </Card>
  );
}

export default withStyles(styles)(ClientCard);
