import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { getInitials } from '../../../../util/helperFunctions';
import Moment from 'react-moment';
import Hidden from '@material-ui/core/Hidden';
import ClientMoreActions from '../../ClientMoreActions/ClientMoreActions';

const styles = theme => ({
  listItem: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    marginBottom: 16,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[4]
    }
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

function ClientListItem({ classes, client }) {
  const { fname, lname, date_added, last_opened, no_of_sessions } = client;

  const dateAddedFormatted = (
    <Moment format="MMM D, YYYY" withTitle>
      {date_added}
    </Moment>
  );

  return (
    <Paper elevation={2} className={classes.listItem}>
      <Grid container spacing={0} alignItems="center">
        <Grid item md={4} sm={7} xs={10} className={classes.nameGrid}>
          <Avatar className={classes.avatar}>
            {getInitials(fname, lname)}
          </Avatar>
          <Typography
            component="span"
            className={classes.name}
            gutterBottom={false}
          >
            {fname + ' ' + lname}
          </Typography>
        </Grid>
        <Hidden xsDown>
          <Grid item md={2} sm={4}>
            <Typography component="span" gutterBottom={false}>
              {no_of_sessions}
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
              {last_opened !== null ? (
                <Moment format="MMM D, YYYY" withTitle>
                  {last_opened}
                </Moment>
              ) : (
                'Not yet opened'
              )}
            </Typography>
          </Grid>
        </Hidden>
        <Grid item md={1} sm={1} xs={2} align="right">
          <ClientMoreActions client={client} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(ClientListItem);
