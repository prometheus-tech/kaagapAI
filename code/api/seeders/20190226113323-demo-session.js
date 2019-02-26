'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sessions', [{
      session_name: 'Session 1',
      date_of_session: '2019-02-26',
      c_id: 1
    },
    {
      session_name: 'Session 2',
      date_of_session: '2019-03-04',
      c_id: 1
    },
    {
      session_name: 'Session 3',
      date_of_session: '2019-03-14',
      c_id: 1
    },
    {
      session_name: 'Session 1',
      date_of_session: '2019-02-27',
      c_id: 2
    },
    {
      session_name: 'Session 2',
      date_of_session: '2019-03-15',
      c_id: 2
    },
    {
      session_name: 'Session 1',
      date_of_session: '2019-02-26',
      c_id: 3
    },
    {
      session_name: 'Session 2',
      date_of_session: '2019-03-06',
      c_id: 3
    },
    {
      session_name: 'Session 3',
      date_of_session: '2019-03-18',
      c_id: 3
    },
    {
      session_name: 'Session 4',
      date_of_session: '03-25-2019',
      c_id: 3
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sessions', null, {});
  }
};
