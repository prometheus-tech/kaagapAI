import React, { Component } from 'react';

import ARCHIVES from '../../graphql/queries/archives';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArchivedClientCards from '../../components/Archives/ArchivedClientCards/ArchivedClientCards';
import ArchivedSessionCards from '../../components/Archives/ArchivedSessionCards/ArchivedSessionCards';
import ArchivedSessionDocumentCards from '../../components/Archives/ArchivedSessionDocumentCards/ArchivedSessionDocumentCards';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

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
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Query query={ARCHIVES} fetchPolicy="network-only">
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
              {data.archives.clients.length > 0 ? (
                <ArchivedClientCards clients={data.archives.clients} />
              ) : null}
              {data.archives.sessions.length > 0 ? (
                <ArchivedSessionCards sessions={data.archives.sessions} />
              ) : null}
              {data.archives.session_documents.length > 0 ? (
                <ArchivedSessionDocumentCards
                  sessionDocuments={data.archives.session_documents}
                />
              ) : null}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ArchivesPage);
