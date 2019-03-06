import React from 'react';

import { USER_ID } from '../../../util/constants';

import CLIENTS from '../../../graphql/queries/clients';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientCard from '../ClientCard/ClientCard';

function ClientsCards() {
  const p_id = parseInt(localStorage.getItem(USER_ID));

  return (
    <Grid container spacing={16}>
      <Query query={CLIENTS} variables={{ p_id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }

          return (
            <Auxilliary>
              {data.getClients.map(client => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={client.c_id}>
                    <ClientCard
                      clientId={client.c_id}
                      firstName={client.fname}
                      lastName={client.lname}
                      sessionsCount={client.no_of_sessions}
                    />
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
