import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import CardSortControls from '../../components/CardSortControls/CardSortControls';
// import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import ClientTable from '../../components/Clients/ClientsTable/ClientsTable';

class ClientsPage extends Component {
  state = {
    clients: [
      {
        id: 1,
        firstName: 'Cardo',
        lastName: 'Dalisay',
        gender: 'M',
        dateAdded: '2019-02-19 11:00:00',
        lastOpened: '2019-02-21 11:00:00',
        lastModified: '2019-02-21 11:30:00',
        numberOfSessions: 7
      },
      {
        id: 2,
        firstName: 'Maria',
        lastName: 'Flordeliza',
        gender: 'F',
        dateAdded: '2019-02-15 09:20:00',
        lastOpened: '2019-02-16 11:00:00',
        lastModified: '2019-02-15 11:30:00',
        numberOfSessions: 4
      },
      {
        id: 3,
        firstName: 'Ronaldo',
        lastName: 'Bato',
        gender: 'M',
        dateAdded: '2019-02-13 08:20:00',
        lastOpened: '2019-02-14 10:00:00',
        lastModified: '2019-02-17 11:30:00',
        numberOfSessions: 10
      },
      {
        id: 4,
        firstName: 'Anton',
        lastName: 'Trillanes',
        gender: 'M',
        dateAdded: '2019-02-09 07:20:00',
        lastOpened: '2019-02-13 09:00:00',
        lastModified: '2019-02-16 11:30:00',
        numberOfSessions: 8
      },
      {
        id: 5,
        firstName: 'Mark',
        lastName: 'Roxas',
        gender: 'M',
        dateAdded: '2019-01-09 07:20:00',
        lastOpened: '2019-02-13 09:00:00',
        lastModified: '2019-02-17 10:30:00',
        numberOfSessions: 12
      },
      {
        id: 6,
        firstName: 'Louie',
        lastName: 'Gordon',
        gender: 'M',
        dateAdded: '2019-01-08 07:20:00',
        lastOpened: '2019-02-14 09:00:00',
        lastModified: '2019-02-14 10:30:00',
        numberOfSessions: 0
      }
    ],
    cardView: true,
    cardSortAnchorElement: null,
    cardSortSelectedIndex: 0,
    cardSortOrder: 'desc'
  };

  openSortOptionsHandler = element => {
    this.setState({ cardSortAnchorElement: element });
  };

  changeSortSelectedIndexHandler = (element, index) => {
    this.setState({
      cardSortSelectedIndex: index,
      cardSortAnchorElement: null
    });
  };

  closeSortOptionsHandler = () => {
    this.setState({ cardSortAnchorElement: null });
  };

  changeSortOrderHandler = updatedSortOrder => {
    this.setState({
      cardSortOrder: updatedSortOrder
    });
  };

  render() {
    return (
      <Auxilliary>
        <CardSortControls
          cardSortAnchorElement={this.state.cardSortAnchorElement}
          cardSortSelectedIndex={this.state.cardSortSelectedIndex}
          sortOptionsOpened={this.openSortOptionsHandler}
          sortSelectedIndexChanged={this.changeSortSelectedIndexHandler}
          sortOptionsClosed={this.closeSortOptionsHandler}
          sortOrder={this.state.cardSortOrder}
          sortOrderChanged={this.changeSortOrderHandler}
        />
        {/* <ClientsCards clients={this.state.clients} /> */}

        {/* For the meantime, if you want to test your ClientsTable, just comment my code
        above and put yours below this comment */}

        <ClientTable />
      </Auxilliary>
    );
  }
}

export default ClientsPage;
