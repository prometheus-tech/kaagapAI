const fs = require('fs');
fs.writeFile('./gcpconfig.json', process.env.GCP_CRED, err => {});
