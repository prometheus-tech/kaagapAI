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

  return (
    <Paper elevation={0} className={classes.listItem}>
      <Grid container spacing={0} alignItems="center">
        <Grid item md={1}>
          <Avatar className={classes.avatar}>
            {getInitials(firstName, lastName)}
          </Avatar>
        </Grid>
        <Grid item md={3}>
          <Typography className={classes.name} gutterBottom={false}>
            {firstName + ' ' + lastName}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography gutterBottom={false}>{numberOfSessions}</Typography>
        </Grid>
        <Grid item md={2}>
          <Typography gutterBottom={false}>{dateAdded}</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography gutterBottom={false}>{lastModified}</Typography>
        </Grid>
        <Grid item md={1} align="right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(ClientListItem);
