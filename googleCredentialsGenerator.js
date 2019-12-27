require('dotenv').config();

const fs = require('fs');

console.log('Generating Google credentials file');

fs.writeFile(
  'config/google-credentials.json',
  process.env.GOOGLE_CONFIG,
  err => {
    if (err) {
      console.log(
        'An error occured while generating the Google credentials file',
        err
      );
    }

    console.log('Google credentials generated');
  }
);