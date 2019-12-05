require('dotenv').config({ path: './.env' });
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: 'true',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    acessToken: process.env.GMAIL_ACCESS_TOKEN
  }
});

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendEmail = (subject, body, email) => {
  var sent = '';

  const mailOptions = {
    from: `kaagapAI <${process.env.GMAIL_USER}>`,
    to: email,
    subject: subject,
    text: 'Hello ' + email + '! \n' + body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log('Hello', err);
        reject(err);
      } else {
        sent = true;
        resolve(sent);
      }
    });
  });
};

const verifyCode = (input_code, verificationCode) => {
  if (input_code == verificationCode) {
    return true;
  } else {
    return false;
  }
};

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

module.exports = {
  generateCode,
  sendEmail,
  verifyCode,
  hashPassword
};
