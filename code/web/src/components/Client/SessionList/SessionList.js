import React from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import SessionListHeader from './SessionListHeader/SessionListHeader';
import SessionListItem from './SessionListItem/SessionListItem';

function SessionList({ sessions }) {
  return (
    <Auxilliary>
      <SessionListHeader />
      {sessions.map(session => {
        return <SessionListItem key={session.session_id} session={session} />;
      })}
    </Auxilliary>
  );
}

export default SessionList;
