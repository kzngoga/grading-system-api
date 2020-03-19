import { Router } from 'express';
import user from './user';
import search from './search';

const router = Router();

router.use('/user', user);
router.use('/search', search);

export default router;
