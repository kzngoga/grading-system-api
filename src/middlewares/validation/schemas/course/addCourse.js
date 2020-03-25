import Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string().min(3).max(25)
    .required()
    .error(() => 'Enter a valid course name Ex: Algorithm'),
  totalMarks: Joi.number()
    .required()
    .error(() => 'Enter valid totalMarks Ex: 100'),
  department: Joi.string()
    .required()
    .error(() => 'Enter Valid Department ID'),
});
