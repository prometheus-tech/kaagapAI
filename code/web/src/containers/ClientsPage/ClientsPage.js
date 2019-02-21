import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

class ClientsPage extends Component {
  state = {
    clients: [
      {
        firstName: 'Cardo',
        lastName: 'Dalisay',
        gender: 'M',
        dateAdded: '2019-02-19 11:00:00',
        lastOpened: '2019-02-21 11:00:00',
        lastModified: '2019-02-21 11:30:00',
        numberOfSessions: 7
      },
      {
        firstName: 'Maria',
        lastName: 'Flordeliza',
        gender: 'F',
        dateAdded: '2019-02-15 09:20:00',
        lastOpened: '2019-02-16 11:00:00',
        lastModified: '2019-02-15 11:30:00',
        numberOfSessions: 4
      },
      {
        firstName: 'Ronaldo',
        lastName: 'Bato',
        gender: 'M',
        dateAdded: '2019-02-13 08:20:00',
        lastOpened: '2019-02-14 10:00:00',
        lastModified: '2019-02-17 11:30:00',
        numberOfSessions: 10
      },
      {
        firstName: 'Anton',
        lastName: 'Trillanes',
        gender: 'M',
        dateAdded: '2019-02-09 07:20:00',
        lastOpened: '2019-02-13 09:00:00',
        lastModified: '2019-02-16 11:30:00',
        numberOfSessions: 8
      },
      {
        firstName: 'Mark',
        lastName: 'Roxas',
        gender: 'M',
        dateAdded: '2019-01-09 07:20:00',
        lastOpened: '2019-02-13 09:00:00',
        lastModified: '2019-02-17 10:30:00',
        numberOfSessions: 12
      }
    ]
  };

  render() {
    return (
      <Aux>
        <h1>Clients</h1>
      </Aux>
    );
  }
}

export default ClientsPage;
