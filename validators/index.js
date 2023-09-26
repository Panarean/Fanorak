const validator = require('validator');

function validateSigninParameters(form) {
  const errors = {};
  
  // Validate name
  if (!validator.isEmail(form.email)) {
    errors.email='Invalid email';
  }
  return errors;
}
function validateSignupParameters(form) {
    const errors = {};
    
    // Validate name
    if (validator.isEmpty(form.firstName)) {
      errors.firstName='Name is required';
    }
  
    // Validate last name
    if (validator.isEmpty(form.lastName)) {
      errors.lastName='Last name is required';
    }
  
    // Validate email
    if (!validator.isEmail(form.email)) {
      errors.email='Invalid email';
    }
  
    // Validate phone number
    if (!validator.isMobilePhone(form.phoneNumber, 'any')) {
      errors.phoneNumber='Invalid phone number';
    }
  
    // Validate passport or NationalID
    if (validator.isEmpty(form.passportOrNationalID)) {
      errors.passportOrNationalID='Passport or National ID is required';
    }
  
    // Validate address
    if (validator.isEmpty(form.address)) {
      errors.address='Address is required';
    }
  
    // Validate password
    if (!validator.isLength(form.password, { min: 8 })) {
      errors.password='Password should be at least 8 characters long';
    }
  
    // Validate password confirmation
    if (!validator.equals(form.password, form.confirmPassword)) {
      errors.confirmPassword='Password confirmation does not match';
    }
  
    return errors;
}

module.exports = {
    validateSignupParameters,
    validateSigninParameters,
  
}