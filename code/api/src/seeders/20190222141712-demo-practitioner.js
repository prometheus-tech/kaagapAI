'use strict';
// const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Practitioners', [{
      p_id: '67b8ba58-301e-45a3-ba01-ed6d0d229785',
      email: 'amysantiago@gmail.com',
      phone_no: '0982736485767',
      password: 'asantiago',
      fname: 'Amy',
      lname: 'Santiago',
      license: '092834023840',
      profession: 'Psychologist',
      status: 'active',
      date_registered: new Date(),
      date_deactivated: '',
      last_logged: '2019-02-27 23:20:00',
      session_token: ''
    },
    {
      p_id: 'd5654875-e8ce-4e9b-97d3-bfca9c743466',
      email: 'rosadiaz@gmail.com',
      phone_no: '09847837463',
      password: 'rdiaz',
      fname: 'Rosa',
      lname: 'Diaz',
      license: '2423423423423',
      profession: 'Guidance Counselor',
      status: 'active',
      date_registered: new Date(),
      date_deactivated: '',
      last_logged: new Date(),
      session_token: 'ksjhdf8729845'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Practitioners', null, {});
  }
};
