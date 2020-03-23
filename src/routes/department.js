import { Router } from 'express';
import Controller from '../controllers/department';
import * as Validations from '../middlewares/validation/department';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isDOS, Controller.getAllDepartments);

router.post('/new', Authorization.isDOS, Validations.addDepartment, Controller.addDepartment);
router.patch('/update', Authorization.isDOS, Validations.updateDepartment, Controller.updateDepartment);
router.patch('/deactivate', Authorization.isDOS, Controller.deactivateDepartment);
router.patch('/activate', Authorization.isDOS, Controller.activateDepartment);


export default router;
