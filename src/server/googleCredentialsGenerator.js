require('dotenv').config();

const fs = require('fs');
const path = require('path');

console.log('Generating Google credentials file...');

fs.writeFileSync(
  path.join(__dirname, 'config', 'google-credentials.json'),
  process.env.GOOGLE_CONFIG,
  err => {
    if (err) {
      console.log(
        'An error occured while generating the Google credentials file',
        err
      );
    }

    console.log(process.env.GOOGLE_CONFIG);

    console.log('Google credentials generated');
  }
);
