require('dotenv').config({ path: './.env' });
const fs = require('fs');

console.log('Generating Google credentials');

fs.writeFile(
  'config/google-credentials.json',
  process.env.GOOGLE_CONFIG,
  err => {}
);
