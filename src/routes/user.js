import { Router } from 'express';
import Controller from '../controllers/user';
import * as Validations from '../middlewares/validation/user';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/', Authorization.isStatusOn, Authorization.isAdminDos, Controller.getAllUsers);

router.post('/new', Authorization.isStatusOn, Authorization.isAdminDos, Validations.addUser, Controller.signUp);
router.post('/login', Controller.userLogin);

router.patch('/change-password', Authorization.isStatusOn, Authorization.isAdminDos, Validations.changePassword, Controller.changePassword);
router.patch('/reset-password', Controller.resetPassword);
router.patch('/new-password', Controller.newPassword);
router.patch('/update', Authorization.isStatusOn, Authorization.isAdminDos, Validations.updateUser, Controller.updateUser);
router.patch('/delete', Authorization.isStatusOn, Authorization.isAdminDos, Controller.deleteUser);


export default router;
