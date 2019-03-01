import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { getInitials } from '../../../util/helperFunctions';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[500]
  },
  card: {
    '&:hover': {
      boxShadow: theme.shadows[2]
    },
    cursor: 'pointer'
  }
});

function ClientCard(props) {
  const { classes, id, firstName, lastName, sessionsCount } = props;

  const initials = getInitials(firstName, lastName);
  const name = firstName + ' ' + lastName;
  const sessions =
    sessionsCount > 0 ? sessionsCount + ' sessions' : 'No sessions yet';

  return (
    <Card elevation={0} className={classes.card}>
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
