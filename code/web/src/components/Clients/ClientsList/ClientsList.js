import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Paper from '@material-ui/core/Paper';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientListItem from './ClientListItem/ClientListItem';
import ClientListHeader from './ClientListHeader/ClientListHeader';
import ClientListDropdownHeader from './ClientListDropdownHeader/ClientListDropdownHeader';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  listContainer: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: 16,
      paddingLeft: 16
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: 62,
      paddingLeft: 62
    }
  },
  listHeader: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'transparent'
  }
});

function ClientsList(props) {
  const { classes } = props;

  let clients = null;

  if (props.clients.length > 0) {
    clients = props.clients.map(client => {
      return (
        <Grid key={client.id} item xs={12}>
          <ClientListItem client={client} />
        </Grid>
      );
    });
  }

  return (
    <Auxilliary>
      <Grid
        container
        spacing={0}
        className={classes.listContainer}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper className={classes.listHeader} elevation={0}>
            <Grid container spacing={0} alignItems="center">
              <Grid item md={4} sm={7} xs={10}>
                <ClientListHeader
                  sortOrder={props.sortOrder}
                  currentSortedByLabel={props.currentSortedByLabel}
                  selectedIndexChanged={props.sortSelectedIndexChanged}
                  sortOrderChanged={props.sortOrderChanged}
                  headerLabel="Name"
                />
              </Grid>
              <Hidden xsDown>
                <Grid item md={2} sm={4}>
                  <ClientListHeader
                    sortOrder={props.sortOrder}
                    currentSortedByLabel={props.currentSortedByLabel}
                    selectedIndexChanged={props.sortSelectedIndexChanged}
                    sortOrderChanged={props.sortOrderChanged}
                    headerLabel="Sessions"
                  />
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item md={2} sm={false}>
                  <ClientListHeader
                    sortOrder={props.sortOrder}
                    currentSortedByLabel={props.currentSortedByLabel}
                    selectedIndexChanged={props.sortSelectedIndexChanged}
                    sortOrderChanged={props.sortOrderChanged}
                    headerLabel="Date Added"
                  />
                </Grid>
                <Grid item md={3} sm={false}>
                  <ClientListDropdownHeader
                    currentSortedByLabel={props.currentSortedByLabel}
                    selectedIndexChanged={props.sortSelectedIndexChanged}
                    sortOrderChanged={props.sortOrderChanged}
                    options={props.dropdownOptions}
                    optionsOpened={props.dropdownOpened}
                    dropdownSettings={props.dropdownSettings}
                    dropdownSelectedIndexChanged={
                      props.dropdownSelectedIndexChanged
                    }
                    optionsClosed={props.dropdownClosed}
                  />
                </Grid>
              </Hidden>
              <Grid item md={1} sm={2} xs={2} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        className={classes.listContainer}
        alignItems="center"
      >
        {clients}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientsList);
