import React, { Component } from 'react';

import ARCHIVES from '../../graphql/queries/archives';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArchivedClientCards from '../../components/Archives/ArchivedClientCards/ArchivedClientCards';
import ArchivedSessionCards from '../../components/Archives/ArchivedSessionCards/ArchivedSessionCards';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    width: '100vw'
  },
  pageHeader: {
    marginBottom: theme.spacing.unit * 4
  }
});

class ArchivesPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={ARCHIVES}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>;
          }

          return (
            <div className={classes.container}>
              <Grid container>
                <Grid item xs={12} className={classes.pageHeader}>
                  <Typography variant="h5" gutterBottom>
                    Archives
                  </Typography>
                </Grid>
              </Grid>
              <ArchivedClientCards clients={data.archives.clients} />
              <ArchivedSessionCards sessions={data.archives.sessions} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ArchivesPage);
