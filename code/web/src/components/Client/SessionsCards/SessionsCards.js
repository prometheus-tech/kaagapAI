import React from 'react';

import Grid from '@material-ui/core/Grid';
import SessionCard from './SessionCard/SessionCard';

function SessionsCards(props) {
  const { sessions } = props;

  return (
    <Grid container spacing={16}>
      {sessions.map(session => {
        return (
          <Grid item key={session.session_id} xs={12} sm={6} md={4} lg={3}>
            <SessionCard session={session} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SessionsCards;
