'use strict';

var fs = require('fs');
fs.writeFile('./gcpconfig.json', process.env.GCP_CRED, function (err) {});