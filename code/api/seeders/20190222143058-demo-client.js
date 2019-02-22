'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
      fname: 'Jake',
      lname: 'Peralta',
      gender: 'M',
      birthdate: '08/08/1985',
      date_added: new Date(),
      last_opened: '02/27/2019 17:05',
      p_id: 'amysantiago@gmail.com'
    }, 
    {
      fname: 'Elena',
      lname: 'Alvarez',
      gender: 'F',
      birthdate: '07/14/1999',
      date_added: new Date(),
      last_opened: '02/25/2019 17:45',
      p_id: 'rosadiaz@gmail.com'
    }, 
    {
      fname: 'Erika',
      lname: 'Torio',
      gender: 'F',
      birthdate: '01/20/1999',
      date_added: new Date(),
      last_opened: '02/28/2019 18:50',
      p_id: 'amysantiago@gmail.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
