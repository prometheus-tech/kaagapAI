import React from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientListItem from './ClientListItem/ClientListItem';
import ClientListHeader from './ClientListHeader/ClientListHeader';

function ClientsList(props) {
  const { clients, clientEdited } = props;

  return (
    <Auxilliary>
      <ClientListHeader />
      {clients.map(client => {
        return (
          <ClientListItem
            key={client.c_id}
            client={client}
            clientEdited={clientEdited}
          />
        );
      })}
    </Auxilliary>
  );
}

export default ClientsList;
