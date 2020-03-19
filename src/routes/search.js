import { Router } from 'express';
import Controller from '../controllers/search';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/:searchBy', Authorization.isStatusOn, Authorization.isAdminDos, Controller);

export default router;
