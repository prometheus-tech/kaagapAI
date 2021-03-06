import React from 'react';

import { Mutation } from 'react-apollo';
import GET_FILE from '../../../../graphql/mutations/getFile';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';
import SimpleSnackbar from '../../../UI/SimpleSnackbar/SimpleSnackbar';

const styles = theme => ({
  card: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    padding: '0px 0px 0px 0px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      cursor: 'pointer'
    }
  },
  documentCardContent: {
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: theme.spacing.unit
    }
  },
  attachmentCardContent: {},
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
    maxWidth: 140
  },
  cardSubTitle: {
    fontWeight: 400,
    fontSize: theme.spacing.unit * 1.75,
    color: theme.palette.grey[600]
  },
  moreActionButton: {
    position: 'relative',
    top: -theme.spacing.unit * 1.5,
    right: -theme.spacing.unit * 1.5
  },
  shouldAnalyzeContainer: {
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: 'right'
  },
  shouldAnalyzeChip: {
    cursor: 'pointer'
  }
});

function SessionDocumentCard({
  sessionDocument,
  sessionDocumentViewed,
  moreActionsOpened,
  classes
}) {
  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

  return (
    <Mutation
      mutation={GET_FILE}
      onCompleted={({ getFile }) => {
        window.open(getFile, '_blank');
      }}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {(getFile, { loading: gettingFileUrl }) => (
        <Auxilliary>
          <Card
            elevation={1}
            onClick={() => {
              if (!sessionDocument.attachment) {
                sessionDocumentViewed(sessionDocument);
              } else {
                getFile({ variables: { sd_id: sessionDocument.sd_id } });
              }
            }}
            className={classes.card}
          >
            <CardContent
              className={
                !sessionDocument.attachment
                  ? classes.documentCardContent
                  : classes.attachmentCardContent
              }
            >
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
                <div>
                  <IconButton
                    className={classes.moreActionButton}
                    onClick={e => {
                      e.stopPropagation();
                      moreActionsOpened(e, sessionDocument);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
              {!sessionDocument.attachment ? (
                <div className={classes.shouldAnalyzeContainer}>
                  <Chip
                    className={classes.shouldAnalyzeChip}
                    style={{
                      backgroundColor: sessionDocument.should_analyze
                        ? '#f1f8e9'
                        : ''
                    }}
                    icon={
                      sessionDocument.should_analyze ? (
                        <CheckIcon />
                      ) : (
                        <BlockIcon />
                      )
                    }
                    label={
                      sessionDocument.should_analyze ? 'Analyzed' : 'Ignored'
                    }
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
          <SimpleSnackbar
            isOpened={gettingFileUrl}
            message={'Fetching URL for ' + sessionDocument.file_name + '...'}
          />
        </Auxilliary>
      )}
    </Mutation>
  );
}

export default withStyles(styles)(SessionDocumentCard);
