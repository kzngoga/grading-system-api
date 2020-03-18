import Joi from 'joi';

export default Joi.object().keys({
  oldPassword: Joi.string().required().min(6)
    .error(() => 'Enter an old password with at least 6 characters'),
  newPassword: Joi.string().required().min(6)
    .error(() => 'Enter a new password with at least 6 characters'),
});
