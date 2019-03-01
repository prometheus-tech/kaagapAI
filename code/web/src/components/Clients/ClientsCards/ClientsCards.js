import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientCard from '../ClientCard/ClientCard';

const GET_CLIENTS = gql`
  query GetClients($p_id: Int!) {
    getClients(p_id: $p_id) {
      c_id
      fname
      lname
      no_of_sessions
    }
  }
`;

function ClientsCards() {
  const p_id = parseInt(1);

  return (
    <Grid container spacing={16}>
      <Query query={GET_CLIENTS} variables={{ p_id }}>
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
                      id={client.c_id}
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
