import { Router } from 'express';
import Controller from '../controllers/user';
import * as Validations from '../middlewares/validation/user';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isSuperAdmin, Controller.getAllUsers);

router.post('/new', Authorization.isSuperAdmin, Validations.addUser, Controller.signUp);
router.post('/login', Controller.userLogin);
router.post('/superadmin/login', Controller.superAdmin);

router.patch('/change-password', Authorization.isStatusOn, Authorization.isAdminDos, Validations.changePassword, Controller.changePassword);
router.patch('/reset-password', Controller.resetPassword);
router.patch('/new-password', Controller.newPassword);
router.patch('/update', Authorization.isStatusOn, Authorization.isAdminDos, Validations.updateUser, Controller.updateUser);
router.patch('/role/update/:id', Authorization.isSuperAdmin, Validations.updateRole, Controller.updateRole);
router.patch('/deactivate', Authorization.isSuperAdmin, Controller.deactivateUser);
router.patch('/activate', Authorization.isSuperAdmin, Controller.activateUser);


export default router;
