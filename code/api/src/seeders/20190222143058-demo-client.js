'use strict';
// const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
      c_id: '76a4b162-58db-4d93-a21d-d8054bb63352',
      fname: 'Jake',
      lname: 'Peralta',
      gender: 'M',
      birthdate: '1985-08-08',
      date_added: new Date(),
      last_opened: '2019-27-02 17:05:00',
      p_id: '67b8ba58-301e-45a3-ba01-ed6d0d229785'
    }, 
    {
      c_id: '81bde2d8-75cd-48b3-b39a-6d55169d940c',
      fname: 'Elena',
      lname: 'Alvarez',
      gender: 'F',
      birthdate: '1999-07-14',
      date_added: new Date(),
      last_opened: '2019-25-02 17:45:00',
      p_id: 'd5654875-e8ce-4e9b-97d3-bfca9c743466'
    }, 
    {
      c_id: '6d93938a-1404-4b62-9538-a28567c24c46',
      fname: 'Erika',
      lname: 'Torio',
      gender: 'F',
      birthdate: '1999-01-20',
      date_added: new Date(),
      last_opened: '2019-28-02 18:50:00',
      p_id: '67b8ba58-301e-45a3-ba01-ed6d0d229785'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
