import { Router } from 'express';
import Controller from '../controllers/teacher';
import * as Validations from '../middlewares/validation/teacher';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isAdmin, Controller.getAllTeachers);
router.get('/:id', Authorization.isAdmin, Controller.getATeacher);

router.post('/new', Authorization.isAdmin, Validations.addTeacher, Controller.addTeacher);
router.post('/login', Controller.teacherLogin);

router.patch('/update', Authorization.isAdmin, Validations.updateTeacher, Controller.updateTeacher);
router.patch('/activate', Authorization.isAdmin, Controller.activateTeacher);
router.patch('/deactivate', Authorization.isAdmin, Controller.deactivateTeacher);

export default router;
