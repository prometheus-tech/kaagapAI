import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import SessionDocumentCard from './SessionDocumentCard/SessionDocumentCard';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const styles = theme => ({
  middleDivider: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    color: grey[600]
  },
  icon: {
    marginRight: theme.spacing.unit
  }
});

function SessionDocumentCards({
  sessionDocuments,
  sessionDocumentViewed,
  moreActionsOpened,
  classes
}) {
  const documents = sessionDocuments.filter(file => !file.attachment);
  const attachments = sessionDocuments.filter(file => file.attachment);

  return (
    <Auxilliary>
      {documents.length > 0 ? (
        <Auxilliary>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.header}>
                <InsertDriveFileIcon className={classes.icon} />
                <Typography>Documents</Typography>
              </div>
            </Grid>
            {documents.map(document => {
              return (
                <Grid item key={document.sd_id} xs={12} sm={6} md={4} lg={3}>
                  <SessionDocumentCard
                    sessionDocument={document}
                    sessionDocumentViewed={sessionDocumentViewed}
                    moreActionsOpened={moreActionsOpened}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className={classes.middleDivider} />
        </Auxilliary>
      ) : null}
      {attachments.length > 0 ? (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className={classes.header}>
              <AttachFileIcon className={classes.icon} />
              <Typography>Attachments</Typography>
            </div>
          </Grid>
          {attachments.map(document => {
            return (
              <Grid item key={document.sd_id} xs={12} sm={6} md={4} lg={3}>
                <SessionDocumentCard
                  sessionDocument={document}
                  sessionDocumentViewed={sessionDocumentViewed}
                  moreActionsOpened={moreActionsOpened}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </Auxilliary>
  );
}

export default withStyles(styles)(SessionDocumentCards);
