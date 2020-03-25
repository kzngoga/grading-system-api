import Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string().min(3).max(25)
    .error(() => 'Enter a valid course name Ex: Algorithm'),
  totalMarks: Joi.number()
    .error(() => 'Enter valid totalMarks Ex: 100'),
  department: Joi.string()
    .error(() => 'Enter Valid Department ID'),
  course: Joi.string()
    .error(() => 'Enter valid Course Id')
});
