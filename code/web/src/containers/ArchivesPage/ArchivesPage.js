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
import EmptyArchiveIllustration from '../../components/UI/Placeholder/EmptyArchive';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import grey from '@material-ui/core/colors/grey';
import Icon from '@material-ui/core/Icon';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

import { Redirect } from 'react-router-dom';

import { logout } from '../../util/helperFunctions';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    width: '100vw'
  },
  pageHeader: {
    marginBottom: theme.spacing.unit * 4,
    display: 'block',
    padding: '10px',
  },
  archiveTitle: {
    fontWeight: 700,
    color: grey[600],
    marginLeft: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * -5
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
      <Query
        query={ARCHIVES}
        pollInterval={5000}
        fetchPolicy="network-only"
        errorPolicy="all"
      >
        {({ loading, client, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            if (error.graphQLErrors) {
              return error.graphQLErrors.map(({ extensions }) => {
                switch (extensions.code) {
                  case 'UNAUTHENTICATED':
                    logout(client);
                    return <Redirect to="/signin" />;
                  default:
                    return <p>Error</p>;
                }
              });
            }
          }

          return (
            <div className={classes.container}>
              <Grid container>
                <Grid item xs={12} className={classes.pageHeader}>
                  <IconButton
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                  >
                    <Icon>arrow_back</Icon>
                  </IconButton>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.archiveTitle}
                  >
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
              {data.archives.clients.length === 0 &&
              data.archives.sessions.length === 0 &&
              data.archives.session_documents.length === 0 ? (
                <EmptyArchiveIllustration />
              ) : null}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ArchivesPage);
