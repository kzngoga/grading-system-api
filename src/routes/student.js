import { Router } from 'express';
import Controller from '../controllers/student';
import * as Validations from '../middlewares/validation/student';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isAdminDosTeacher, Controller.getAllStudents);
router.get('/:id', Authorization.isAdminDosTeacher, Controller.getAStudent);

router.post('/new', Authorization.isAdmin, Validations.addStudent, Controller.addStudent);
router.post('/login', Controller.studentLogin);

router.patch('/update', Authorization.isAdmin, Validations.updateStudent, Controller.updateStudent);
router.patch('/deactivate', Authorization.isAdmin, Validations.deactivateStudent, Controller.deactivateStudent);

export default router;
