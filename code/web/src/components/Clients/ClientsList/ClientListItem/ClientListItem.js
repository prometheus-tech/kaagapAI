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
    marginBottom: 16,
    cursor: 'pointer'
  },
  name: {
    lineHeight: '1.71429em',
    fontWeight: 500
  },
  avatar: {
    backgroundColor: blue[500],
    marginRight: 16
  },
  nameGrid: {
    display: 'flex',
    alignItems: 'center'
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
    <Moment format="MMM D, YYYY" withTitle>
      {dateAdded}
    </Moment>
  );

  const lastActivity =
    props.lastActivityOption === 'Last Modified' ? (
      <Typography component="span">
        <Moment format="MMM D, YYYY" withTitle>
          {lastModified}
        </Moment>
      </Typography>
    ) : (
      <Typography component="span">
        <Moment format="MMM D, YYYY" withTitle>
          {lastOpened}
        </Moment>
      </Typography>
    );

  return (
    <Paper elevation={0} className={classes.listItem}>
      <Grid container spacing={0} alignItems="center">
        <Grid item md={4} sm={7} xs={10} className={classes.nameGrid}>
          <Avatar className={classes.avatar}>
            {getInitials(firstName, lastName)}
          </Avatar>
          <Typography
            component="span"
            className={classes.name}
            gutterBottom={false}
          >
            {firstName + ' ' + lastName}
          </Typography>
        </Grid>
        <Hidden xsDown>
          <Grid item md={2} sm={4}>
            <Typography component="span" gutterBottom={false}>
              {numberOfSessions}
            </Typography>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item md={2} sm={false}>
            <Typography component="span" gutterBottom={false}>
              {dateAddedFormatted}
            </Typography>
          </Grid>
          <Grid item md={3} sm={false}>
            <Typography component="span" gutterBottom={false}>
              {lastActivity}
            </Typography>
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
