/* eslint-disable import/prefer-default-export */
import addUserSchema from './schemas/user/signup';
import validator from '../../helpers/validator';
import changePasswordSchema from './schemas/user/changePassword';
import updateSchema from './schemas/user/update';
import updateRoleSchema from './schemas/user/updateRole';

export const addUser = (req, res, next) => (
  validator(addUserSchema, req.body, res, next)
);

export const changePassword = (req, res, next) => (
  validator(changePasswordSchema, req.body, res, next)
);

export const updateUser = (req, res, next) => (
  validator(updateSchema, req.body, res, next)
);

export const updateRole = (req, res, next) => (
  validator(updateRoleSchema, req.body, res, next)
);
