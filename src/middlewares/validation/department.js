/* eslint-disable import/prefer-default-export */
import addDepartmentSchema from './schemas/department/addDepartment';
import updateDepartmentSchema from './schemas/department/updateDepartment';

import validator from '../../helpers/validator';

export const addDepartment = (req, res, next) => (
  validator(addDepartmentSchema, req.body, res, next)
);

export const updateDepartment = (req, res, next) => (
  validator(updateDepartmentSchema, req.body, res, next)
);
