import React from 'react';

import { USER_ID } from '../../../util/constants';

import CLIENTS from '../../../graphql/queries/clients';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClientCard from '../ClientCard/ClientCard';

function ClientsCards(props) {
  const p_id = parseInt(localStorage.getItem(USER_ID));

  return (
    <Grid container spacing={16}>
      <Query query={CLIENTS} variables={{ p_id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                  minHeight: '40vh',
                  overflow: 'hidden'
                }}
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            );
          }

          if (error) {
            return <p>Error</p>;
          }

          return (
            <Auxilliary>
              {data.getClients.map(client => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={client.c_id}>
                    <ClientCard client={client} />
                  </Grid>
                );
              })}
            </Auxilliary>
          );
        }}
      </Query>
    </Grid>
  );
}

export default ClientsCards;
