import Joi from 'joi';

export default Joi.object().keys({
  firstname: Joi.string().min(3).max(25)
    .error(() => 'Enter valid first name. E.g: Frank '),
  lastname: Joi.string().min(3).max(25)
    .error(() => 'Enter a valid Last Name. E.g: Mugisha'),
  email: Joi.string().email()
    .error(() => 'Enter a valid Email. E.g: mugishadavid250@gmail.com'),
  gender: Joi.string().valid('M', 'F')
    .error(() => 'Enter a valid gender value, Ex: M or F'),
  address: Joi.string().min(3).max(25)
    .error(() => 'Enter a valid Address. E.g: Kicukiro'),
  mobileNo: Joi.string().min(3).max(25)
    .error(() => 'Enter a valid Phone Number. E.g: 0780000000'),
});
