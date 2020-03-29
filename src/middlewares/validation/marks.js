/* eslint-disable import/prefer-default-export */
import addMarksSchema from './schemas/marks/addMarks';
import validator from '../../helpers/validator';

export const addMarks = (req, res, next) => (
  validator(addMarksSchema, req.body, res, next)
);
