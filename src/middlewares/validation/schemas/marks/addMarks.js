import Joi from 'joi';

export default Joi.object().keys({
  student: Joi.string().min(3).max(25)
    .required()
    .error(() => 'Enter valid Student Registration Number'),
  course: Joi.string()
    .required()
    .error(() => 'Enter valid course ID'),
  marksTest: Joi.number()
    .required()
    .error(() => 'Enter valid Test Marks'),
  marksExam: Joi.number()
    .required()
    .error(() => 'Enter Valid Exam Marks'),
  verdict: Joi.string().valid('Pass', 'Fail')
    .required()
    .error(() => 'Enter Valid Total'),
});
