import CourseService from '../database/services/course';
import DepartmentService from '../database/services/department';
import out from '../helpers/response';

class CourseController {
  static async addCourse(req, res) {
    try {
      const { name, department } = req.body;
      const nameDuplicate = await CourseService.getSingleCourse({ name });
      if (nameDuplicate) return out(res, 409, 'Course Already Registered', null, 'CONFLICT_ERROR');
      const departmentExist = await DepartmentService.findDepartment({ _id: department });
      if (!departmentExist) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      const createdCourse = await CourseService.addCourse(req.body);
      createdCourse.__v = undefined;
      return out(res, 201, 'Registered Successfully', createdCourse);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAllCourses(req, res) {
    try {
      const courses = await CourseService.getAllCourses();
      if (courses.length === 0) return out(res, 404, 'No Course Found', null, 'NOT_FOUND');
      return out(res, 200, 'Courses Retrieved!', courses);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getACourse(req, res) {
    try {
      const course = await CourseService.getSingleCourse({ _id: req.params.id });
      if (!course) return out(res, 404, 'No Course Found', null, 'NOT_FOUND');
      return out(res, 200, 'Course Found', course);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateCourse(req, res) {
    try {
      const { department } = req.body;
      const { course: courseId } = req.body;
      const departmentExist = req.body.department ? await DepartmentService.findDepartment({ _id: department }) : ('');
      if (!departmentExist && departmentExist === null) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      const course = await CourseService.getSingleCourse({ _id: courseId });
      if (!course) return out(res, 404, 'No Course Found', null, 'NOT_FOUND');
      const updateCourse = await CourseService.updateCourse(courseId, req.body);
      if (!updateCourse) return out(res, 500, 'Can Not Update Teacher', null, 'NOT_FOUND');
      return out(res, 200, 'Course Updated', updateCourse);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deactivateCourse(req, res) {
    try {
      const { course: courseId } = req.body;
      req.body.status = 'OFF';
      const course = await CourseService.getSingleCourse({ _id: courseId });
      if (course.length === 0 || course.status === 'OFF') return out(res, 404, 'Course not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateCourse = await CourseService.updateCourse(courseId, { status: req.body.status });
      if (!updateCourse) return out(res, 500, 'Can not deactivate Course', null, 'NOT_FOUND');
      return out(res, 200, 'Course Deactivated', updateCourse);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async activateCourse(req, res) {
    try {
      const { course: courseId } = req.body;
      req.body.status = 'ON';
      const course = await CourseService.getSingleCourse({ _id: courseId });
      if (course.length === 0 || course.status === 'ON') return out(res, 404, 'Course not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateCourse = await CourseService.updateCourse(courseId, { status: req.body.status });
      if (!updateCourse) return out(res, 500, 'Can not activate Course', null, 'NOT_FOUND');
      return out(res, 200, 'Course Activated', updateCourse);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default CourseController;
