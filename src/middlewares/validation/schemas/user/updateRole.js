import Joi from 'joi';

export default Joi.object().keys({
  role: Joi.string().valid('Admin', 'DOS').required()
    .error(() => 'Enter a valid role value, Ex: Admin or DOS'),
});
