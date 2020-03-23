import { Router } from 'express';
import Controller from '../controllers/teacher';
import * as Validations from '../middlewares/validation/teacher';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isDOS, Controller.getAllTeachers);
router.get('/:id', Authorization.isDOS, Controller.getATeacher);

router.post('/new', Authorization.isDOS, Validations.addTeacher, Controller.addTeacher);
router.post('/login', Controller.teacherLogin);

router.patch('/update', Authorization.isDOS, Validations.updateTeacher, Controller.updateTeacher);
router.patch('/activate', Authorization.isDOS, Controller.activateTeacher);
router.patch('/deactivate', Authorization.isDOS, Controller.deactivateTeacher);

export default router;
