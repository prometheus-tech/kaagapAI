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
}

const generateToken = (practitioner, SECRET) => {
  return jwt.sign({
      practitioner: practitioner.p_id
  }, SECRET, {
    expiresIn: '1h'
  })
}

const getPractitioner = (req, SECRET) => {
  try {
    const token = req.headers.authorization || '';
    const { practitioner } = jwt.verify(token, SECRET);
    return practitioner;
  } catch(err) {
    // console.log(err);
  }
}

export default {
  validateEmail,
  validatePassword,
  generateToken,
  getPractitioner
}