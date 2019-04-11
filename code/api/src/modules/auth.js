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
  // const validPassword = await bcrypt.compare(password, user.password);
  
  // if(!validPassword) {
  if(password != practitioner.password){ //change with code above
    return false;
  } else {
    return true;
  }
}

const generateToken = (practitioner, SECRET) => {
  return jwt.sign({
      user: practitioner.email
  }, SECRET, {
    expiresIn: '1h'
  })
}

export default {
  validateEmail,
  validatePassword,
  generateToken
}