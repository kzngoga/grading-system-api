/* eslint-disable import/prefer-default-export */
import addTeacherSchema from './schemas/teacher/addTeacher';
import validator from '../../helpers/validator';
import updateTeacherSchema from './schemas/teacher/updateTeacher';

export const addTeacher = (req, res, next) => (
  validator(addTeacherSchema, req.body, res, next)
);

export const updateTeacher = (req, res, next) => (
  validator(updateTeacherSchema, req.body, res, next)
);
