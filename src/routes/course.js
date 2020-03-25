import { Router } from 'express';
import Controller from '../controllers/course';
import * as Validations from '../middlewares/validation/course';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Controller.getAllCourses);
router.get('/:id', Controller.getACourse);

router.post('/new', Authorization.isDOS, Validations.addCourse, Controller.addCourse);

router.patch('/update', Authorization.isDOS, Validations.updateCourse, Controller.updateCourse);
router.patch('/activate', Authorization.isDOS, Controller.activateCourse);
router.patch('/deactivate', Authorization.isDOS, Controller.deactivateCourse);

export default router;
