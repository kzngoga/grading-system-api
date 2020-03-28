/* eslint-disable import/prefer-default-export */
import addStudentSchema from './schemas/student/addStudent';
import updateStudentSchema from './schemas/student/updateStudent';
import deactivateStudentSchema from './schemas/student/deactivateStudent';
import validator from '../../helpers/validator';

export const addStudent = (req, res, next) => (
  validator(addStudentSchema, req.body, res, next)
);

export const updateStudent = (req, res, next) => (
  validator(updateStudentSchema, req.body, res, next)
);

export const deactivateStudent = (req, res, next) => (
  validator(deactivateStudentSchema, req.body, res, next)
);
