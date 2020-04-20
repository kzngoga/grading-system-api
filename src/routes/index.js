import { Router } from 'express';
import user from './user';
import search from './search';
import department from './department';
import teacher from './teacher';
import course from './course';
import student from './student';
import marks from './marks';

const router = Router();

router.use('/users', user);
router.use('/search', search);
router.use('/departments', department);
router.use('/teachers', teacher);
router.use('/courses', course);
router.use('/students', student);
router.use('/marks', marks);

export default router;
