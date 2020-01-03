import React from 'react';

import DELETE_CLIENT from '../../../../graphql/mutations/deleteClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../../graphql/queries/clients';

import { cloneDeep } from 'apollo-utilities';

import { withSnackbar } from 'notistack';

import LargeCard from '../../../UI/LargeCard/LargeCard';

function ClientCard(props) {
  const { client, clientEdited } = props;
  const {
    c_id,
    fname,
    lname,
    no_of_sessions,
    gender,
    birthdate,
    date_added,
    last_opened
  } = client;

  return (
    <Mutation
      mutation={DELETE_CLIENT}
      update={(cache, { data: { deleteClient } }) => {
        const clientsQueryParams = {
          query: CLIENTS
        };

        const { clients } = cloneDeep(cache.readQuery(clientsQueryParams));

        cache.writeQuery({
          ...clientsQueryParams,
          data: {
            clients: clients.filter(c => c.c_id !== deleteClient.c_id)
          }
        });

        props.enqueueSnackbar(fname + ' ' + lname + ' successfully archived!');
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        deleteClient: {
          __typename: 'Client',
          c_id,
          fname,
          lname,
          gender,
          birthdate,
          no_of_sessions,
          date_added,
          last_opened
        }
      }}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {deleteClient => (
        <LargeCard
          avatar="person"
          title={`${fname} ${lname}`}
          subtitle={
            no_of_sessions > 0
              ? `${no_of_sessions} sessions`
              : 'No sessions yet'
          }
          color="#0091ea"
          actions={[
            { name: 'Edit', event: () => clientEdited(client), icon: 'edit' },
            {
              name: 'Archive',
              event: () => deleteClient({ variables: { c_id } }),
              icon: 'archive'
            }
          ]}
          link={`/client/${client.c_id}`}
        />
      )}
    </Mutation>
  );
}

export default withSnackbar(ClientCard);
