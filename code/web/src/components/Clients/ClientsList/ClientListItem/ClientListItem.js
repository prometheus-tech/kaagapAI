import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { getInitials } from '../../../../util/helperFunctions';
import Moment from 'react-moment';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  listItem: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    marginBottom: 16
  },
  name: {
    fontFamily: 'roboto',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 1
  },
  avatar: {
    backgroundColor: blue[500]
  }
});

function ClientListItem(props) {
  const { classes } = props;
  const {
    firstName,
    lastName,
    numberOfSessions,
    dateAdded,
    lastModified,
    lastOpened
  } = props.client;

  const dateAddedFormatted = (
    <Moment format="MMM D YYYY" withTitle>
      {dateAdded}
    </Moment>
  );

  const lastActivity =
    lastModified > lastOpened ? (
      <Typography>
        Modified last{' '}
        <Moment format="MMM D YYYY" withTitle>
          {lastModified}
        </Moment>
      </Typography>
    ) : (
      <Typography>
        Opened last{' '}
        <Moment format="MMM D YYYY" withTitle>
          {lastModified}
        </Moment>
      </Typography>
    );

  return (
    <Paper elevation={0} className={classes.listItem}>
      <Grid container spacing={0} alignItems="center">
        <Grid item md={1} sm={2} xs={2}>
          <Avatar className={classes.avatar}>
            {getInitials(firstName, lastName)}
          </Avatar>
        </Grid>
        <Grid item md={3} sm={8} xs={8}>
          <Typography className={classes.name} gutterBottom={false}>
            {firstName + ' ' + lastName}
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item md={2}>
            <Typography gutterBottom={false}>{numberOfSessions}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography gutterBottom={false}>{dateAddedFormatted}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography gutterBottom={false}>{lastActivity}</Typography>
          </Grid>
        </Hidden>
        <Grid item md={1} sm={1} xs={2} align="right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(ClientListItem);
