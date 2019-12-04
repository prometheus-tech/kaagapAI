require('dotenv').config({ path: './.env' });
const fs = require('fs');

fs.writeFile(
  'src/config/google-credentials.json',
  process.env.GOOGLE_CONFIG,
  err => {}
);
