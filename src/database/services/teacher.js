import Teacher from '../models/teacher';

class TeacherService {
  static async addTeacher(teacher) {
    try {
      return await Teacher.create(teacher);
    } catch (error) {
      throw error;
    }
  }

  static async getSingleTeacher(params) {
    try {
      return await Teacher.findOne(params)
        .populate({
          path: 'departments',
          select: 'name'
        });
    } catch (error) {
      throw error;
    }
  }

  static async getAllTeachers() {
    try {
      return await Teacher.find()
        .select('-__v -password');
    } catch (error) {
      throw error;
    }
  }


  static async updateTeacher(_id, update) {
    try {
      return await Teacher.findOneAndUpdate({ _id }, update, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTeacher(params) {
    try {
      return await Teacher.deleteOne(params);
    } catch (error) {
      throw error;
    }
  }


  static async findTeacher(params) {
    try {
      return await Teacher.findOne(params)
        .select('-__v ');
    } catch (error) {
      throw error;
    }
  }
}

export default TeacherService;
