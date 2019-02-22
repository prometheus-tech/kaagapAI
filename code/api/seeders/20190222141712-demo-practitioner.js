'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Practitioners', [{
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
      last_logged: '02/27/2019 17:56',
      session_token: '2492734923749skjhfd'
    },
    {
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
      last_logged: '02/26/2019 7:39',
      session_token: 'ksjhdf8729845'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Practitioners', null, {});
  }
};
