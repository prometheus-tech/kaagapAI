import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const validateEmail = ( practitioner ) => {
  if(!practitioner) {
    return false;
  } else {
    return true;
  }
}

const validatePassword = ({ password, practitioner }) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, practitioner.password, function(err, res) {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })

  // const validPassword = await bcrypt.compare(password, practitioner.password);

  // return validPassword;
}

const generateToken = (practitioner, SECRET) => {
  return jwt.sign({
      practitioner: practitioner.p_id
  }, SECRET, {
    expiresIn: '1h'
  })
}

export default {
  validateEmail,
  validatePassword,
  generateToken
}