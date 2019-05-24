'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'prometheustechofficial@gmail.com',
    pass: 'promtech2018'
  },
  tls: { rejectUnauthorized: false }
});

var generateCode = function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
};

var sendEmail = function sendEmail(subject, body, email) {
  var sent = "";

  var mailOptions = {
    from: 'kaagapAI <prometheustechofficial@gmail.com>',
    to: email,
    subject: subject,
    text: 'Hello ' + email + '! \n' + body
    //html: html body
  };

  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        reject(err);
      } else {
        sent = true;
        resolve(sent);
      }
    });
  });
};

var verifyCode = function verifyCode(input_code, verificationCode) {
  if (input_code == verificationCode) {
    return true;
  } else {
    return false;
  }
};

var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt2.default.hash(password, 12, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

exports.default = {
  generateCode: generateCode,
  sendEmail: sendEmail,
  verifyCode: verifyCode,
  hashPassword: hashPassword
};