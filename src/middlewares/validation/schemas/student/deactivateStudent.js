import Joi from 'joi';

export default Joi.object().keys({
  month: Joi.number()
    .valid('3', '9')
    .error(() => 'Enter Valid Month ex: 3 or 9'),
  student: Joi.string()
    .error(() => 'Enter valid student Id'),
});
