import React from 'react';

import { USER_ID } from '../../../util/constants';

import CLIENTS from '../../../graphql/queries/clients';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import ClientCard from './ClientCard/ClientCard';
import LoadingFullScreen from '../../UI/LoadingFullScreen/LoadingFullScreen';

function ClientsCards() {
  const p_id = parseInt(localStorage.getItem(USER_ID));

  return (
    <Query query={CLIENTS} variables={{ p_id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <LoadingFullScreen />;
        }

        if (error) {
          return <p>Error</p>; // replace later
        }

        return (
          <Grid container spacing={16}>
            {data.clients.map(client => {
              return (
                <Grid item key={client.c_id} xs={12} sm={6} md={4} lg={3}>
                  <ClientCard client={client} />
                </Grid>
              );
            })}
          </Grid>
        );
      }}
    </Query>
  );
}

export default ClientsCards;
