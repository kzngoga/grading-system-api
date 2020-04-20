import TeacherService from '../database/services/teacher';
import DepartmentService from '../database/services/department';
import out from '../helpers/response';
import genpass from '../helpers/generatePassword';
import { generate, check } from '../helpers/bcrypt';
import { sign } from '../helpers/jwt';
import mailer from '../helpers/mailer';

class TeacherController {
  static async addTeacher(req, res) {
    try {
      const { email, department } = req.body;
      const teacherDuplicate = await TeacherService.findTeacher({ email });
      if (teacherDuplicate) return out(res, 409, 'Teacher Already Registered', null, 'CONFLICT_ERROR');
      const departmentExist = await DepartmentService.findDepartment({ _id: department });
      if (!departmentExist) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      const genpwd = await genpass();
      const hashedPassword = await generate(genpwd);
      req.body.password = hashedPassword;
      const createdTeacher = await TeacherService.addTeacher(req.body);
      createdTeacher.password = undefined;
      createdTeacher.__v = undefined;
      const EmailStatus = await mailer(['sign-up', {
        email,
        genpwd,
        body: process.env.GRADING_WEB
      }, email
      ]);
      if (EmailStatus) return out(res, 500, EmailStatus, null, 'SERVER_ERROR');
      return out(res, 201, 'Registered successfully', createdTeacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async teacherLogin(req, res) {
    try {
      const { email, password } = req.body;
      const teacher = await TeacherService.findTeacher({ email });
      if (!teacher) return out(res, 404, 'Email does not exist', null, 'NOT_FOUND');
      if (teacher.status === 'OFF') return out(res, 404, 'Service Not Available', null, 'NOT_FOUND');
      const match = await check(teacher.password, password);
      if (!match) return out(res, 400, 'Password is incorrect', null, 'AUTHENTICATION_ERROR');
      teacher.password = undefined;
      teacher.__v = undefined;
      teacher._doc.token = await sign({
        email: teacher.email, id: teacher._id, status: teacher.status, role: 'teacher'
      });
      return out(res, 200, 'Logged In Successfully', teacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAllTeachers(req, res) {
    try {
      const teachers = await TeacherService.getAllTeachers();
      if (teachers.length === 0) return out(res, 404, 'No Teacher Found', null, 'NOT_FOUND');
      return out(res, 200, 'Teachers Retrieved', teachers);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getATeacher(req, res) {
    try {
      const teacher = await TeacherService.getSingleTeacher({ _id: req.params.id });
      if (!teacher) return out(res, 404, 'No Teacher Found', null, 'NOT_FOUND');
      teacher[0].password = undefined;
      return out(res, 200, 'Teacher Found', teacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateTeacher(req, res) {
    try {
      const { department } = req.body;
      const { teacher: teacherId } = req.body;
      const teacher = await TeacherService.findTeacher({ _id: teacherId });
      if (!teacher) return out(res, 404, 'No Teacher Found', null, 'NOT_FOUND');
      const departmentExist = req.body.department ? await DepartmentService.findDepartment({ _id: department }) : ('');
      if (!departmentExist && departmentExist === null) return out(res, 403, 'Invalid Department id', null, 'BAD_REQUEST');
      const updateTeacher = await TeacherService.updateTeacher(teacherId, req.body);
      if (!updateTeacher) return out(res, 500, 'Can Not Update Teacher', null, 'NOT_FOUND');
      updateTeacher.password = undefined;
      updateTeacher.__v = undefined;
      return out(res, 200, 'Teacher Updated', updateTeacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deactivateTeacher(req, res) {
    try {
      const { teacher: teacherId } = req.body;
      req.body.status = 'OFF';
      const teacher = await TeacherService.findTeacher({ _id: teacherId });
      if (teacher.length === 0 || teacher.status === 'OFF') return out(res, 404, 'Teacher not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateTeacher = await TeacherService.updateTeacher(teacherId, { status: req.body.status });
      if (!updateTeacher) return out(res, 500, 'Can not deactivate Teacher', null, 'NOT_FOUND');
      updateTeacher.password = undefined;
      updateTeacher.__v = undefined;
      return out(res, 200, 'Teacher Deactivated', updateTeacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async activateTeacher(req, res) {
    try {
      const { teacher: teacherId } = req.body;
      req.body.status = 'ON';
      const teacher = await TeacherService.findTeacher({ _id: teacherId });
      if (teacher.length === 0 || teacher.status === 'ON') return out(res, 404, 'Teacher not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateTeacher = await TeacherService.updateTeacher(teacherId, { status: req.body.status });
      if (!updateTeacher) return out(res, 500, 'Can not activate Teacher', null, 'NOT_FOUND');
      updateTeacher.password = undefined;
      updateTeacher.__v = undefined;
      return out(res, 200, 'Teacher Activated', updateTeacher);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default TeacherController;
