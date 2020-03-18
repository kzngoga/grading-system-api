import { Router } from 'express';
import Controller from '../controllers/user';
import * as Validations from '../middlewares/validation/user';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdminDos, Validations.addUser, Controller.signUp);
router.post('/login', Controller.userLogin);

router.patch('/change-password', Authorization.isAdminDos, Validations.changePassword, Controller.changePassword);
router.patch('/reset-password', Controller.resetPassword);
router.patch('/new-password', Controller.newPassword);

export default router;
