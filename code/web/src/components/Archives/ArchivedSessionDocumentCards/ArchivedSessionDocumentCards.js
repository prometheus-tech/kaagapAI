import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArchivedSessionDocumentCard from './ArchivedSessionDocumentCard/ArchivedSessionDocumentCard';

function ArchivedSessionDocumentCards({ sessionDocuments }) {
  return (
    <Grid container spacing={16} style={{ paddingBottom: '80px' }}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Session Documents
        </Typography>
      </Grid>
      {sessionDocuments.map(sessionDocument => {
        return (
          <Grid key={sessionDocument.sd_id} item xs={12} sm={6} md={4} lg={3}>
            <ArchivedSessionDocumentCard sessionDocument={sessionDocument} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ArchivedSessionDocumentCards;
