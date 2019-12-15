if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: './.env' });

const fs = require('fs');

console.log('Generating Google credentials file');

fs.writeFile(
  'config/google-credentials.json',
  process.env.GOOGLE_CONFIG,
  err => {
    console.log(
      'An error occured while generating the Google credentials file',
      err
    );
  }
);
