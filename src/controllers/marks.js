import MarksService from '../database/services/marks';
import StudentService from '../database/services/student';
import CourseService from '../database/services/course';
import out from '../helpers/response';

class MarksController {
  static async addMarks(req, res) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { student, course, marksTest, marksExam } = req.body;
      const studentExist = await StudentService.getAStudent({ _id: student });
      if (!studentExist) return out(res, 403, 'Invalid Student Registration Number', null, 'BAD_REQUEST');
      const courseExist = await CourseService.getSingleCourse({ _id: course });
      if (!courseExist) return out(res, 403, 'Invalid Course id', null, 'BAD_REQUEST');
      req.body.total = Number(marksTest) + Number(marksExam);
      const createdMarks = await MarksService.addMarks(req.body);
      return out(res, 201, 'Marks Registered!!!', createdMarks);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getMarks(req, res) {
    try {
      const marks = await MarksService.getAllMarks();
      if (marks.length === 0) return out(res, 404, 'No Marks Found', null, 'NOT_FOUND');
      return out(res, 200, 'Marks Retrieved', marks);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default MarksController;
