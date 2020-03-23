import Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string().min(3).max(25)
    .required()
    .error(() => 'Enter valid Name. Ex: Software Engineering'),
  department: Joi.string()
    .required()
    .error(() => 'Enter Department ID'),
});
