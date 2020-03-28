import { Router } from 'express';
import user from './user';
import search from './search';
import department from './department';
import teacher from './teacher';
import course from './course';
import student from './student';

const router = Router();

router.use('/user', user);
router.use('/search', search);
router.use('/department', department);
router.use('/teacher', teacher);
router.use('/course', course);
router.use('/student', student);

export default router;
