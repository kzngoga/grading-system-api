import { Router } from 'express';
import user from './user';
import search from './search';
import department from './department';
import teacher from './teacher';
import course from './course';
import student from './student';
import marks from './marks';

const router = Router();

router.use('/user', user);
router.use('/search', search);
router.use('/department', department);
router.use('/teacher', teacher);
router.use('/course', course);
router.use('/student', student);
router.use('/marks', marks);

export default router;
