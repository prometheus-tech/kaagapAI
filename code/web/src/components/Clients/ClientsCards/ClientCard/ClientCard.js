import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { getInitials } from '../../../../util/helperFunctions';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[500]
  }
});

function ClientCard(props) {
  const { classes } = props;

  const initials = getInitials(props.firstName, props.lastName);
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
