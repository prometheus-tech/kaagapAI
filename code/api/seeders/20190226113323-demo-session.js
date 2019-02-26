'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sessions', [{
      session_name: 'Session 1',
      date_of_session: '02-26-2019',
      c_id: 1
    },
    {
      session_name: 'Session 2',
      date_of_session: '03-04-2019',
      c_id: 1
    },
    {
      session_name: 'Session 3',
      date_of_session: '03-14-2019',
      c_id: 1
    },
    {
      session_name: 'Session 1',
      date_of_session: '02-27-2019',
      c_id: 2
    },
    {
      session_name: 'Session 2',
      date_of_session: '03-15-2019',
      c_id: 2
    },
    {
      session_name: 'Session 1',
      date_of_session: '02-26-2019',
      c_id: 3
    },
    {
      session_name: 'Session 2',
      date_of_session: '03-06-2019',
      c_id: 3
    },
    {
      session_name: 'Session 3',
      date_of_session: '03-18-2019',
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
