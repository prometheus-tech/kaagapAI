import React from 'react';

import Grid from '@material-ui/core/Grid';
import SessionCard from './SessionCard/SessionCard';

function SessionCards({ sessions, sessionEdited, sessionDeleted }) {
  return (
    <Grid container spacing={16}>
      {sessions.map(session => {
        return (
          <Grid item key={session.session_id} xs={12} sm={6} md={4} lg={3}>
            <SessionCard
              sessionEdited={sessionEdited}
              sessionDeleted={sessionDeleted}
              session={session}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SessionCards;
