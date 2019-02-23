'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
      fname: 'Jake',
      lname: 'Peralta',
      gender: 'M',
      birthdate: '1985-08-08',
      date_added: new Date(),
      last_opened: '2019-27-02 17:05:00',
      p_id: 1
    }, 
    {
      fname: 'Elena',
      lname: 'Alvarez',
      gender: 'F',
      birthdate: '1999-07-14',
      date_added: new Date(),
      last_opened: '2019-25-02 17:45:00',
      p_id: 2
    }, 
    {
      fname: 'Erika',
      lname: 'Torio',
      gender: 'F',
      birthdate: '1999-01-20',
      date_added: new Date(),
      last_opened: '2019-28-02 18:50:00',
      p_id: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
