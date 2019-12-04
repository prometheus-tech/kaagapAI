const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prometheustechofficial@gmail.com',
    pass: 'promtech2018'
  },
  tls: { rejectUnauthorized: false }
});

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendEmail = (subject, body, email) => {
  var sent = '';

  const mailOptions = {
    from: 'kaagapAI <prometheustechofficial@gmail.com>',
    to: email,
    subject: subject,
    text: 'Hello ' + email + '! \n' + body
    //html: html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
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
