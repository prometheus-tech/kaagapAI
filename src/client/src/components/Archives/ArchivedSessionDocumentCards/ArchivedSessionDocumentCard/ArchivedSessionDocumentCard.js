import React from 'react';

import { Mutation } from 'react-apollo';
import RESTORE_SESSION_DOCUMENT from '../../../../graphql/mutations/restoreSessionDocument';
import PERMANENTLY_DELETE_SESSION_DOCUMENT from '../../../../graphql/mutations/permanentlyDeleteSessionDocument';
import ARCHIVES from '../../../../graphql/queries/archives';
import SESSION from '../../../../graphql/queries/session';

import { cloneDeep } from 'apollo-utilities';

import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';

import { withSnackbar } from 'notistack';

const styles = theme => ({
  card: {
    marginTop: '1rem',
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      cursor: 'pointer'
    }
  },
  cardContent: {
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: theme.spacing.unit
    }
  },
  cardDivContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardGeneralInfoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: 'transparent',
    borderRadius: '0px',
    textAlign: 'center',
    marginRight: theme.spacing.unit
  },
  icon: {
    fontSize: theme.spacing.unit * 5
  },
  cardTitle: {
    fontWeight: 500,
    fontSize: theme.spacing.unit * 2,
    minWidth: 140,
    maxWidth: 140
  },
  cardSubTitle: {
    fontWeight: 400,
    fontSize: theme.spacing.unit * 1.75,
    color: theme.palette.grey[600]
  },
  iconAction: {
    marginRight: theme.spacing.unit
  },
  cardActions: {
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: 'right'
  }
});

function ArchivedSessionDocumentCard(props) {
  const {
    sessionDocument,
    permanentDeleteConfirmationDialogOpened,
    classes
  } = props;

  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

  return (
    <Mutation
      mutation={RESTORE_SESSION_DOCUMENT}
      update={(cache, { data: { restoreSessionDocument } }) => {
        const { archives } = cloneDeep(cache.readQuery({ query: ARCHIVES }));

        archives.session_documents = archives.session_documents.filter(
          session_document =>
            session_document.sd_id !== restoreSessionDocument.sd_id
        );

        cache.writeQuery({
          query: ARCHIVES,
          data: {
            archives
          }
        });

        props.enqueueSnackbar(
          sessionDocument.file_name + ' successfully restored!'
        );
      }}
      refetchQueries={() => {
        return [
          {
            query: SESSION,
            variables: { session_id: sessionDocument.session_id }
          }
        ];
      }}
      awaitRefetchQueries={true}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {(restoreSessionDocument, { loading: restoreSessionDocumentLoading }) => (
        <Mutation
          mutation={PERMANENTLY_DELETE_SESSION_DOCUMENT}
          update={(cache, { data: { permanentlyDeleteSessionDocument } }) => {
            const { archives } = cloneDeep(
              cache.readQuery({ query: ARCHIVES })
            );

            archives.session_documents = archives.session_documents.filter(
              session_document =>
                session_document.sd_id !==
                permanentlyDeleteSessionDocument.sd_id
            );

            cache.writeQuery({
              query: ARCHIVES,
              data: {
                archives
              }
            });

            props.enqueueSnackbar(
              sessionDocument.file_name + ' permanently deleted!'
            );
          }}
        >
          {(
            permanentlyDeleteSessionDocument,
            { loading: permanentlyDeleteSessionDocumentLoading }
          ) => (
            <Card
              elevation={1}
              onClick={() => {
                alert('Please restore first!');
              }}
              className={classes.card}
            >
              <CardContent className={classes.cardContent}>
                <div className={classes.cardDivContent}>
                  <div className={classes.cardGeneralInfoContainer}>
                    <Avatar
                      className={classes.avatar}
                      style={{ color: iconColor }}
                    >
                      <Icon
                        className={classNames(avatarIconClass, classes.icon)}
                      />
                    </Avatar>
                    <div className={classes.cardTextInfo}>
                      <Typography className={classes.cardTitle} noWrap>
                        {sessionDocument.file_name}
                      </Typography>
                      <Typography className={classes.cardSubTitle}>
                        <Moment format="MMM D, YYYY" withTitle>
                          {sessionDocument.date_added}
                        </Moment>
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.cardActions}>
                  {!restoreSessionDocumentLoading ? (
                    <Tooltip title="Restore">
                      <IconButton
                        className={classes.iconAction}
                        onClick={e => {
                          e.stopPropagation();
                          restoreSessionDocument({
                            variables: { sd_id: sessionDocument.sd_id }
                          });
                        }}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <CircularProgress className={classes.progress} />
                  )}
                  <Tooltip title="Delete permanently">
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        permanentDeleteConfirmationDialogOpened(
                          sessionDocument.file_name,
                          permanentlyDeleteSessionDocumentLoading,
                          () => {
                            permanentlyDeleteSessionDocument({
                              variables: { sd_id: sessionDocument.sd_id }
                            });
                          }
                        );
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          )}
        </Mutation>
      )}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(ArchivedSessionDocumentCard));
