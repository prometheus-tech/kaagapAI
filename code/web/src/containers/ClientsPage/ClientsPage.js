import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import CardSortControls from '../../components/CardSortControls/CardSortControls';
import ClientsCards from '../../components/Clients/ClientsCards/ClientsCards';
import sort from 'fast-sort';
import { camelize } from '../../util/helperFunctions';
import ViewControl from '../../components/ViewControl/ViewControl';
import ClientsList from '../../components/Clients/ClientsList/ClientsList';
import AddClientModal from '../../components/Clients/AddClientModal/AddClientModal';

const cardSortingOptions = ['Name', 'Last Modified', 'Last Opened'];
const listSortingOptions = [
  'Name',
  'Sessions',
  'Date Added',
  'Last Modified',
  'Last Opened'
];

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
    cardSortSettings: {
      cardSortAnchorElement: null,
      cardSortSelectedIndex: 0,
      cardSortOrder: 'asc'
    },
    listSortSettings: {
      listSortSelectedIndex: 0,
      listSortOrder: 'asc'
    },
    view: 'list'
  };

  openSortOptionsHandler = element => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.cardSortAnchorElement = element;

    this.setState({
      cardSortSettings: updatedCardSortSettings
    });
  };

  changeSortSelectedIndexHandler = (element, index) => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.cardSortSelectedIndex = index;
    updatedCardSortSettings.cardSortAnchorElement = null;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  closeSortOptionsHandler = () => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.cardSortAnchorElement = null;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  changeSortOrderHandler = updatedSortOrder => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.cardSortOrder = updatedSortOrder;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  sortClients = () => {
    let sortingProperty = camelize(
      cardSortingOptions[this.state.cardSortSettings.cardSortSelectedIndex]
    );

    // Sort by first name when sorting option is by name
    if (sortingProperty === 'name') {
      sortingProperty = 'firstName';
    }

    if (this.state.cardSortSettings.cardSortOrder === 'asc') {
      sort(this.state.clients).asc(sortingProperty);
    } else if (this.state.cardSortSettings.cardSortOrder === 'desc') {
      sort(this.state.clients).desc(sortingProperty);
    }
  };

  changeListSortSelectedIndexHandler = sortingOption => {
    const updatedListSortSettings = { ...this.state.listSortSettings };

    updatedListSortSettings.listSortSelectedIndex = listSortingOptions.indexOf(
      sortingOption
    );
    updatedListSortSettings.listSortOrder = 'asc';

    this.setState({ listSortSettings: updatedListSortSettings });
  };

  changeViewHandler = updatedView => {
    this.setState({
      view: updatedView
    });
  };

  render() {
    this.sortClients();

    const clientsView =
      this.state.view === 'list' ? (
        <Auxilliary>
          <CardSortControls
            sortingOptions={cardSortingOptions}
            cardSortSettings={this.state.cardSortSettings}
            sortOptionsOpened={this.openSortOptionsHandler}
            sortSelectedIndexChanged={this.changeSortSelectedIndexHandler}
            sortOptionsClosed={this.closeSortOptionsHandler}
            sortOrderChanged={this.changeSortOrderHandler}
          />
          <ClientsCards clients={this.state.clients} />
        </Auxilliary>
      ) : (
        <ClientsList
          sortOrder={this.state.listSortSettings.listSortOrder}
          currentSortedByLabel={
            listSortingOptions[
              this.state.listSortSettings.listSortSelectedIndex
            ]
          }
          sortSelectedIndexChanged={this.changeListSortSelectedIndexHandler}
          clients={this.state.clients}
        />
      );

    return (
      <Auxilliary>
        <AddClientModal />;
        <ViewControl
          view={this.state.view}
          viewChanged={this.changeViewHandler}
        />
        {clientsView}
      </Auxilliary>
    );
  }
}

export default ClientsPage;
