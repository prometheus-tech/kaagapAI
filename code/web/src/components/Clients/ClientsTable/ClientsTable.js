import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import { blueGrey } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {
  cards: {
    height: '3.5rem',
    width: '85%',
    backgroundColor: '#ffffff',
    marginTop: '1.5rem',
    borderRadius: '2px',
    boxShadow: 'none'
  },
  tableHeader: {
    width: '85%',
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  name: {
    fontFamily: 'roboto',
    marginTop: 20,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 1
  },
  lastActivity: {
    fontSize: 12,
    marginTop: 20
  },
  tableLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: blueGrey[600]
  },
  moreAction: {
    marginTop: 5
  },
  avatar: {
    margin: 11,
    backgroundColor: blue[500]
  }
};

function ClientsTable(props) {
  const { classes } = props;
  return (
    <Auxilliary>
      <Grid container direction="row" justify="center">
        <Card className={classes.tableHeader}>
          <Grid container direction="row">
            <Grid container direction="row">
              <Grid item xs={3}>
                <Typography className={classes.tableLabel}>Name</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.tableLabel} align="center">
                  Last Activity
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.tableLabel} align="center">
                  Date Created
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.tableLabel} align="center">
                  Sessions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid container direction="row" justify="center">
        <Card className={classes.cards}>
          <Grid container direction="row">
            <Grid item xs={1}>
              <Avatar className={classes.avatar} />
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.name}>John Doe</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.lastActivity} align="center">
                20 hours ago
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.lastActivity} align="center">
                February 11, 2019
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.lastActivity} align="center">
                07
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton className={classes.moreAction} align="right">
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientsTable);
