import React from 'react';

import DELETE_SESSION from '../../../../graphql/mutations/deleteSession';
import { Mutation } from 'react-apollo';
import CLIENT from '../../../../graphql/queries/client';

import { withSnackbar } from 'notistack';

import orange from '@material-ui/core/colors/orange';

import { cloneDeep } from 'apollo-utilities';
import Moment from 'react-moment';

import LargeCard from '../../../UI/LargeCard/LargeCard';

function SessionCard(props) {
  const { session, sessionEdited } = props;

  const { c_id, session_id, session_name, date_of_session } = session;

  return (
    <Mutation
      mutation={DELETE_SESSION}
      update={(cache, { data: { deleteSession } }) => {
        const clientQueryParams = {
          query: CLIENT,
          variables: { c_id }
        };

        const { client } = cloneDeep(cache.readQuery(clientQueryParams));

        client.sessions = client.sessions.filter(
          s => s.session_id !== deleteSession.session_id
        );

        client.no_of_sessions = client.sessions.length;

        cache.writeQuery({
          ...clientQueryParams,
          data: {
            client
          }
        });

        props.enqueueSnackbar(session_name + ' archived!');
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        deleteSession: {
          __typename: 'Session',
          c_id,
          session_id,
          session_name,
          date_of_session
        }
      }}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {deleteSession => (
        <LargeCard
          avatar="folder"
          title={session_name}
          subtitle={
            <Moment format="MMM D, YYYY" withTitle>
              {date_of_session}
            </Moment>
          }
          color={orange[800]}
          actions={[
            { name: 'Edit', event: () => sessionEdited(session), icon: 'edit' },
            {
              name: 'Archive',
              event: () =>
                deleteSession({
                  variables: {
                    session_id
                  }
                }),
              icon: 'archive'
            }
          ]}
          link={`/session/${session.session_id}`}
        />
      )}
    </Mutation>
  );
}

export default withSnackbar(SessionCard);
