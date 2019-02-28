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
const listLastActionDropdownOptions = ['Last Modified', 'Last Opened'];

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
      anchorElement: null,
      selectedIndex: 0,
      sortOrder: 'asc'
    },
    listSortSettings: {
      selectedIndex: 0,
      sortOrder: 'asc'
    },
    view: 'card',
    listLastActionDropdownSettings: {
      anchorElement: null,
      selectedIndex: 0
    }
  };

  openCardSortOptionsHandler = element => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.anchorElement = element;

    this.setState({
      cardSortSettings: updatedCardSortSettings
    });
  };

  changeCardSortSelectedIndexHandler = (element, index) => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.selectedIndex = index;
    updatedCardSortSettings.anchorElement = null;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  closeCardSortOptionsHandler = () => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.anchorElement = null;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  changeCardSortOrderHandler = updatedSortOrder => {
    const updatedCardSortSettings = { ...this.state.cardSortSettings };

    updatedCardSortSettings.sortOrder = updatedSortOrder;

    this.setState({ cardSortSettings: updatedCardSortSettings });
  };

  openListLastActionDropdownHandler = element => {
    const updatedListLastActionDropdownSettings = {
      ...this.state.listLastActionDropdownSettings
    };

    updatedListLastActionDropdownSettings.anchorElement = element;

    this.setState({
      listLastActionDropdownSettings: updatedListLastActionDropdownSettings
    });
  };

  changeListLastActionDropdownSelectedIndexHandler = (element, index) => {
    const updatedListLastActionDropdownSettings = {
      ...this.state.listLastActionDropdownSettings
    };

    updatedListLastActionDropdownSettings.selectedIndex = index;
    updatedListLastActionDropdownSettings.anchorElement = null;

    if (
      this.state.listSortSettings.selectedIndex === 3 ||
      this.state.listSortSettings.selectedIndex === 4
    ) {
      const sortingOption =
        listLastActionDropdownOptions[
          updatedListLastActionDropdownSettings.selectedIndex
        ];
      this.changeListSortSelectedIndexHandler(
        sortingOption,
        this.state.listSortSettings.sortOrder
      );
    }

    this.setState({
      listLastActionDropdownSettings: updatedListLastActionDropdownSettings
    });
  };

  closeListLastActionDropdownHandler = () => {
    const updatedListLastActionDropdownSettings = {
      ...this.state.listLastActionDropdownSettings
    };

    updatedListLastActionDropdownSettings.anchorElement = null;

    this.setState({
      listLastActionDropdownSettings: updatedListLastActionDropdownSettings
    });
  };

  changeListSortSelectedIndexHandler = (sortingOption, sortingOrder) => {
    if (
      listSortingOptions.indexOf(sortingOption) !==
      this.state.listSortSettings.selectedIndex
    ) {
      const updatedListSortSettings = { ...this.state.listSortSettings };

      updatedListSortSettings.selectedIndex = listSortingOptions.indexOf(
        sortingOption
      );
      updatedListSortSettings.sortOrder = sortingOrder ? sortingOrder : 'asc';

      this.setState({ listSortSettings: updatedListSortSettings });
    }
  };

  changeListSortOrderHandler = updatedSortOrder => {
    const updatedListSortSettings = { ...this.state.listSortSettings };

    updatedListSortSettings.sortOrder = updatedSortOrder;

    this.setState({ listSortSettings: updatedListSortSettings });
  };

  sortClients = () => {
    const sortSettings =
      this.state.view === 'card'
        ? { ...this.state.cardSortSettings }
        : { ...this.state.listSortSettings };
    const sortingOptions =
      this.state.view === 'card' ? cardSortingOptions : listSortingOptions;

    let sortingProperty = camelize(sortingOptions[sortSettings.selectedIndex]);

    // Sort by first name when sorting option is by name
    if (sortingProperty === 'name') {
      sortingProperty = 'firstName';
    } else if (sortingProperty === 'sessions') {
      sortingProperty = 'numberOfSessions';
    }

    if (sortSettings.sortOrder === 'asc') {
      sort(this.state.clients).asc(sortingProperty);
    } else if (sortSettings.sortOrder === 'desc') {
      sort(this.state.clients).desc(sortingProperty);
    }
  };

  changeViewHandler = updatedView => {
    // Reset to default
    this.setState({
      cardSortSettings: {
        anchorElement: null,
        selectedIndex: 0,
        sortOrder: 'asc'
      },
      listSortSettings: {
        selectedIndex: 0,
        sortOrder: 'asc'
      }
    });

    this.setState({
      view: updatedView
    });
  };

  render() {
    this.sortClients();

    const clientsView =
      this.state.view === 'card' ? (
        <Auxilliary>
          <CardSortControls
            sortOptions={cardSortingOptions}
            sortSettings={this.state.cardSortSettings}
            sortOptionsOpened={this.openCardSortOptionsHandler}
            sortSelectedIndexChanged={this.changeCardSortSelectedIndexHandler}
            sortOptionsClosed={this.closeCardSortOptionsHandler}
            sortOrderChanged={this.changeCardSortOrderHandler}
          />
          <ClientsCards clients={this.state.clients} />
        </Auxilliary>
      ) : (
        <ClientsList
          sortOrder={this.state.listSortSettings.sortOrder}
          currentSortedByLabel={
            listSortingOptions[this.state.listSortSettings.selectedIndex]
          }
          sortSelectedIndexChanged={this.changeListSortSelectedIndexHandler}
          sortOrderChanged={this.changeListSortOrderHandler}
          dropdownSettings={this.state.listLastActionDropdownSettings}
          dropdownOptions={listLastActionDropdownOptions}
          dropdownOpened={this.openListLastActionDropdownHandler}
          dropdownSelectedIndexChanged={
            this.changeListLastActionDropdownSelectedIndexHandler
          }
          dropdownClosed={this.closeListLastActionDropdownHandler}
          clients={this.state.clients}
        />
      );

    return (
      <Auxilliary>
        <AddClientModal />
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
