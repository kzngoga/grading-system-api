import addCourseSchema from './schemas/course/addCourse';
import updateCourseSchema from './schemas/course/updateCourse';
import validator from '../../helpers/validator';

export const addCourse = (req, res, next) => (
  validator(addCourseSchema, req.body, res, next)
);

export const updateCourse = (req, res, next) => (
  validator(updateCourseSchema, req.body, res, next)
);
