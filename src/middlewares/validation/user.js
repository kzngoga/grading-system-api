/* eslint-disable import/prefer-default-export */
import addUserSchema from './schemas/user/signup';
import validator from '../../helpers/validator';
import changePasswordSchema from './schemas/user/changePassword';

export const addUser = (req, res, next) => (
  validator(addUserSchema, req.body, res, next)
);

export const changePassword = (req, res, next) => (
  validator(changePasswordSchema, req.body, res, next)
);
