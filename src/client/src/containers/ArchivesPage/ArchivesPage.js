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
import Placeholder from '../../components/UI/Placeholder/Placeholder';
import EmptyArchiveIllustration from '../../assets/Archive_Illustration.svg';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import grey from '@material-ui/core/colors/grey';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import AppBar from '../../components/Navigation/AppBar/AppBar';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Main from '../../hoc/Main/Main';
import PermanentDeleteConfirmationDialog from '../../components/Archives/PermanentDeleteConfirmationDialog/PermanentDeleteConfirmationDialog';
import SimpleSnackbar from '../../components/UI/SimpleSnackbar/SimpleSnackbar';

const styles = theme => ({
  pageHeader: {
    marginBottom: theme.spacing.unit * 4,
    display: 'block',
    padding: '10px'
  },
  archiveTitle: {
    fontWeight: 700,
    color: grey[600],
    marginLeft: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * -5
  }
});

class ArchivesPage extends Component {
  state = {
    isPermanentDeleteConfirmationDialogOpened: false,
    permanentDeleteLabel: null,
    permanentDeleteActionLoading: null,
    permanentDeleteAction: null
  };

  openPermanentDeleteConfirmationDialog = (label, loading, action) => {
    this.setState({
      isPermanentDeleteConfirmationDialogOpened: true,
      permanentDeleteLabel: label,
      permanentDeleteActionLoading: loading,
      permanentDeleteAction: action
    });
  };

  closePermanentDeleteConfirmDialog = () => {
    this.setState({
      isPermanentDeleteConfirmationDialogOpened: false
    });
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  render() {
    const { classes } = this.props;

    const {
      isPermanentDeleteConfirmationDialogOpened,
      permanentDeleteLabel,
      permanentDeleteActionLoading,
      permanentDeleteAction
    } = this.state;

    return (
      <Query query={ARCHIVES} fetchPolicy="network-only" errorPolicy="all">
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <div />;
          }

          return (
            <Auxilliary>
              <AppBar />
              <Main>
                <Grid container>
                  <Grid item xs={12} className={classes.pageHeader}>
                    <IconButton
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                    >
                      <ArrowBackIcon />
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
                  <ArchivedClientCards
                    clients={data.archives.clients}
                    permanentDeleteConfirmationDialogOpened={
                      this.openPermanentDeleteConfirmationDialog
                    }
                  />
                ) : null}
                {data.archives.sessions.length > 0 ? (
                  <ArchivedSessionCards
                    sessions={data.archives.sessions}
                    permanentDeleteConfirmationDialogOpened={
                      this.openPermanentDeleteConfirmationDialog
                    }
                  />
                ) : null}
                {data.archives.session_documents.length > 0 ? (
                  <ArchivedSessionDocumentCards
                    sessionDocuments={data.archives.session_documents}
                    permanentDeleteConfirmationDialogOpened={
                      this.openPermanentDeleteConfirmationDialog
                    }
                  />
                ) : null}
                {data.archives.clients.length === 0 &&
                data.archives.sessions.length === 0 &&
                data.archives.session_documents.length === 0 ? (
                  <Placeholder illustration={EmptyArchiveIllustration} />
                ) : null}
              </Main>
              <PermanentDeleteConfirmationDialog
                isDialogOpened={isPermanentDeleteConfirmationDialogOpened}
                dialogClosed={this.closePermanentDeleteConfirmDialog}
                permanentDeleteLabel={permanentDeleteLabel}
                permanentDeleteAction={permanentDeleteAction}
              />
              <SimpleSnackbar
                isOpened={permanentDeleteActionLoading}
                message={'Deleting ' + permanentDeleteLabel + '...'}
              />
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ArchivesPage);
