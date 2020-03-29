import { Router } from 'express';
import Controller from '../controllers/marks';
import * as Validations from '../middlewares/validation/marks';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isTeacher, Controller.getMarks);

router.post('/new', Authorization.isTeacher, Validations.addMarks, Controller.addMarks);

export default router;
