import React, { PureComponent } from 'react';
import SessionListHeader from './SessionListHeader/SessionListHeader';
import SessionListItem from './SessionListItem/SessionListItem';

export default class SessionList extends PureComponent {
  render() {
    return (
      <div>
        <SessionListHeader />
        <SessionListItem />
      </div>
    );
  }
}
