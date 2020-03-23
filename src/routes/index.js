import { Router } from 'express';
import user from './user';
import search from './search';
import department from './department';
import teacher from './teacher';

const router = Router();

router.use('/user', user);
router.use('/search', search);
router.use('/department', department);
router.use('/teacher', teacher);

export default router;
