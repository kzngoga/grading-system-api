import StudentService from '../database/services/student';
import DepartmentService from '../database/services/department';
import out from '../helpers/response';
import genRom from '../helpers/generateRoman';


class StudentController {
  static async addStudent(req, res) {
    try {
      const { department } = req.body;
      const departmentExist = await DepartmentService.findDepartment({ _id: department });
      if (!departmentExist) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      if (req.body.intake === 'March Intake') req.body.startMonth = '3';
      if (req.body.intake === 'September Intake') req.body.startMonth = '9';
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const baseYear = 2018;
      let intake = year - baseYear;
      let increaseWith = intake + 1;
      if (month >= 1 && month < 6) {
        intake += increaseWith;
      } else {
        increaseWith += 1;
        intake += increaseWith;
      }
      const romanNum = await genRom(intake);
      const count = await StudentService.countId();
      const inNber = count + 1;
      if (inNber < 10) {
        const nber = `000${inNber}`;
        const nber2 = `GRAD${nber}`;
        if (req.body.intake === 'March Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/MAR${year}`;
          req.body.regNum = fin;
        }
        if (req.body.intake === 'September Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/SEP${year}`;
          req.body.regNum = fin;
        }
      } else if (inNber > 9 && inNber < 100) {
        const nber = `00${inNber}`;
        const nber2 = `GRAD${nber}`;
        if (req.body.intake === 'March Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/MAR${year}`;
          req.body.regNum = fin;
        }
        if (req.body.intake === 'September Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/SEP${year}`;
          req.body.regNum = fin;
        }
      } else if (inNber > 99 && inNber < 1000) {
        const nber = `0${inNber}`;
        const nber2 = `GRAD${nber}`;
        if (req.body.intake === 'March Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/MAR${year}`;
          req.body.regNum = fin;
        }
        if (req.body.intake === 'September Intake') {
          // const year = new Date().getFullYear();
          const fin = `${nber2}${romanNum}/SEP${year}`;
          req.body.regNum = fin;
        }
      }

      const createdStudent = await StudentService.addStudent(req.body);
      return out(res, 201, 'Registered successfully', createdStudent);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      if (students.length === 0) return out(res, 404, 'No Students Found', null, 'NOT_FOUND');
      return out(res, 200, 'Student(s) Found', students);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAStudent(req, res) {
    try {
      const student = await StudentService.getAStudent({ _id: req.params.id });
      if (!student) return out(res, 404, 'No Students Found', null, 'NOT_FOUND');
      return out(res, 200, 'Student Found', student);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateStudent(req, res) {
    try {
      const { department } = req.body;
      const { student: studentId } = req.body;
      const student = await StudentService.getAStudent({ _id: studentId });
      if (!student) return out(res, 404, 'No Student Found', null, 'NOT_FOUND');
      const departmentExist = req.body.department ? await DepartmentService.findDepartment({ _id: department }) : ('');
      if (!departmentExist && departmentExist === null) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      const updateStudent = await StudentService.updateStudent(studentId, req.body);
      if (!updateStudent) return out(res, 500, 'Can Not Update Student', null, 'NOT_FOUND');
      return out(res, 200, 'Student Updated', updateStudent);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deactivateStudent(req, res) {
    try {
      const { student: studentId } = req.body;
      const { month } = req.body;
      const student = await StudentService.getAStudent({ _id: studentId });
      if (!student || student.status === 'OFF') return out(res, 404, 'No Student Found', null, 'NOT_FOUND');
      if (month === '9' && student.intake === 'March Intake') req.body.status = 'OFF';
      if (month === '3' && student.intake === 'September Intake') req.body.status = 'OFF';
      if (month === '3' && student.intake === 'March Intake') return out(res, 500, 'Can not deactivate Student, He Started in March Intake');
      if (month === '9' && student.intake === 'September Intake') return out(res, 500, 'Can not deactivate Student, He Started in September Intake');
      const updateStudent = await StudentService.updateStudent(student, req.body);
      return out(res, 200, 'Student Deactivated', updateStudent);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default StudentController;
