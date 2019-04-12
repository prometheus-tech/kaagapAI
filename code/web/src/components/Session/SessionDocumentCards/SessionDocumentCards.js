import React from 'react';

import Grid from '@material-ui/core/Grid';
import SessionDocumentCard from './SessionDocumentCard/SessionDocumentCard';

function SessionDocumentCards({
  sessionDocuments,
  sessionDocumentViewed,
  isMoreActionsOpened,
  moreActionsOpened,
  moreActionsClosed,
  anchorEl,
  contentEdited
}) {
  return (
    <Grid container spacing={16}>
      {sessionDocuments.map(sessionDocument => {
        return (
          <Grid item key={sessionDocument.sd_id} xs={12} sm={6} md={4} lg={3}>
            <SessionDocumentCard
              sessionDocument={sessionDocument}
              sessionDocumentViewed={sessionDocumentViewed}
              contentEdited={contentEdited}
              isMoreActionsOpened={isMoreActionsOpened}
              moreActionsOpened={moreActionsOpened}
              moreActionsClosed={moreActionsClosed}
              anchorEl={anchorEl}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SessionDocumentCards;
