import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientListItem from './ClientListItem/ClientListItem';
import ClientListHeader from './ClientListHeader/ClientListHeader';
import Hidden from '@material-ui/core/Hidden';
import ClientListDropdownHeader from './ClientListDropdownHeader/ClientListDropdownHeader';
import Dropdown from '../../UI/Dropdown/Dropdown';

const styles = theme => ({
  listContainer: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 8,
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
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent'
  }
});

function ClientsList(props) {
  const {
    classes,
    sortOrder,
    currentSortedByLabel,
    sortSelectedIndexChanged,
    sortOrderChanged,
    dropdownSettings,
    dropdownOpened,
    dropdownOptions,
    dropdownSelectedIndexChanged,
    dropdownClosed,
    clients
  } = props;

  let clientsList = null;

  if (clients.length > 0) {
    clientsList = clients.map(client => {
      return (
        <Grid key={client.id} item xs={12}>
          <ClientListItem
            client={client}
            lastActivityOption={dropdownOptions[dropdownSettings.selectedIndex]}
          />
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
              <Hidden xsDown>
                <Grid item md={4} sm={7}>
                  <ClientListHeader
                    sortOrder={sortOrder}
                    currentSortedByLabel={currentSortedByLabel}
                    selectedIndexChanged={sortSelectedIndexChanged}
                    sortOrderChanged={sortOrderChanged}
                    defaultSortOrder="asc"
                    label="Name"
                  />
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={2} sm={4}>
                  <ClientListHeader
                    sortOrder={sortOrder}
                    currentSortedByLabel={currentSortedByLabel}
                    selectedIndexChanged={sortSelectedIndexChanged}
                    sortOrderChanged={sortOrderChanged}
                    defaultSortOrder="desc"
                    label="Sessions"
                  />
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item md={2} sm={false}>
                  <ClientListHeader
                    sortOrder={sortOrder}
                    currentSortedByLabel={currentSortedByLabel}
                    selectedIndexChanged={sortSelectedIndexChanged}
                    sortOrderChanged={sortOrderChanged}
                    defaultSortOrder="desc"
                    label="Date Added"
                  />
                </Grid>
                <Grid item md={3} sm={false}>
                  <ClientListDropdownHeader
                    label={dropdownOptions[dropdownSettings.selectedIndex]}
                    opened={dropdownOpened}
                    sortOrder={sortOrder}
                    currentSortedByLabel={currentSortedByLabel}
                    sortSelectedIndexChanged={sortSelectedIndexChanged}
                    sortOrderChanged={sortOrderChanged}
                  />
                  <Dropdown
                    options={dropdownOptions}
                    anchorElement={dropdownSettings.anchorElement}
                    selectedIndex={dropdownSettings.selectedIndex}
                    opened={dropdownOpened}
                    closed={dropdownClosed}
                    selectedIndexChanged={dropdownSelectedIndexChanged}
                  />
                </Grid>
                <Grid item md={1} sm={2} xs={2} />
              </Hidden>
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
        {clientsList}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientsList);
