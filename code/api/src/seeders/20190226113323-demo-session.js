'use strict';
// const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sessions', [{
      session_id: '02e91df5-f35b-4cad-9d72-73c8bc2edd99',
      session_name: 'Session 1',
      date_of_session: '2019-02-26',
      archive_status: 'active',
      c_id: '6d93938a-1404-4b62-9538-a28567c24c46'
    },
    {
      session_id: '16cce96d-f9a3-49b0-9108-3da67ccfa32c',
      session_name: 'Session 2',
      date_of_session: '2019-03-04',
      archive_status: 'active',
      c_id: '6d93938a-1404-4b62-9538-a28567c24c46'
    },
    {
      session_id: '44413419-ebb1-4488-8a9d-0f98ae273aae',
      session_name: 'Session 3',
      date_of_session: '2019-03-14',
      archive_status: 'active',
      c_id: '6d93938a-1404-4b62-9538-a28567c24c46'
    },
    {
      session_id: '5fc15e8b-41cd-47d7-a1d7-c314b144ca1e',
      session_name: 'Session 1',
      date_of_session: '2019-02-27',
      archive_status: 'active',
      c_id: '76a4b162-58db-4d93-a21d-d8054bb63352'
    },
    {
      session_id: '6c55cfc7-f61d-46fa-a0f6-bbbe0a7a36fd',
      session_name: 'Session 2',
      date_of_session: '2019-03-15',
      archive_status: 'active',
      c_id: '76a4b162-58db-4d93-a21d-d8054bb63352'
    },
    {
      session_id: 'a02654cd-7e65-4aea-a9e2-1d48702da4be',
      session_name: 'Session 1',
      date_of_session: '2019-02-26',
      archive_status: 'active',
      c_id: '81bde2d8-75cd-48b3-b39a-6d55169d940c'
    },
    {
      session_id: 'bcf28460-9eca-48a0-a297-912812ba9262',
      session_name: 'Session 2',
      date_of_session: '2019-03-06',
      archive_status: 'active',
      c_id: '81bde2d8-75cd-48b3-b39a-6d55169d940c'
    },
    {
      session_id: 'bebf23ad-5a30-4433-b7f0-ff5c4eb7d9d1',
      session_name: 'Session 3',
      date_of_session: '2019-03-18',
      archive_status: 'active',
      c_id: '81bde2d8-75cd-48b3-b39a-6d55169d940c'
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sessions', null, {});
  }
};
