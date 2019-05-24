'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateEmail = function validateEmail(practitioner) {
  if (!practitioner) {
    return false;
  } else {
    return true;
  }
};

var validatePassword = function validatePassword(_ref) {
  var password = _ref.password,
      practitioner = _ref.practitioner;

  return new Promise(function (resolve, reject) {
    _bcrypt2.default.compare(password, practitioner.password, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

var generateToken = function generateToken(practitioner, SECRET) {
  return _jsonwebtoken2.default.sign({
    practitioner: practitioner.p_id
  }, SECRET, {
    expiresIn: '1h'
  });
};

var getPractitioner = function getPractitioner(req, SECRET) {
  try {
    var token = req.headers.authorization || '';

    var _jwt$verify = _jsonwebtoken2.default.verify(token, SECRET),
        practitioner = _jwt$verify.practitioner;

    return practitioner;
  } catch (err) {
    // console.log(err);
  }
};

var verifyPractitioner = function verifyPractitioner(practitioner) {
  var errorMessage = null;
  var errorCode = null;

  if (!practitioner) {
    errorMessage = 'User does not exist';
    errorCode = 'USER_NOT_EXIST';
  } else if (practitioner.user_status == 'pending' && practitioner.verification_code == 'verified') {
    errorMessage = 'Your account is still being processed. Thank you for waiting';
    errorCode = 'USER_PENDING';
  } else if (practitioner.user_status == 'pending' && practitioner.verification_code != 'verified') {
    errorMessage = 'Please verify your account first';
    errorCode = 'USER_PENDING';
  }

  return { errorMessage: errorMessage, errorCode: errorCode };
};

exports.default = {
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  generateToken: generateToken,
  getPractitioner: getPractitioner,
  verifyPractitioner: verifyPractitioner
};