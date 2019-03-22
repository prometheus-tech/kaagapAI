import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ClientMoreActions from '../../ClientMoreActions/ClientMoreActions';

import { getInitials } from '../../../../util/helperFunctions';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[500]
  },
  card: {
    '&:hover': {
      boxShadow: theme.shadows[4]
    },
    cursor: 'pointer'
  }
});

function ClientCard({ classes, client }) {
  const { fname, lname, no_of_sessions } = client;
  const initials = getInitials(fname, lname);
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  return (
    <Card elevation={2} className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{initials}</Avatar>}
        action={<ClientMoreActions client={client} />}
        title={name}
        subheader={sessions}
      />
    </Card>
  );
}

export default withStyles(styles)(ClientCard);
