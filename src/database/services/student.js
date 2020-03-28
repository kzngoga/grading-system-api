import Student from '../models/student';

class StudentService {
  static async addStudent(student) {
    try {
      return await Student.create(student);
    } catch (error) {
      throw error;
    }
  }

  static async getAllStudents() {
    try {
      return await Student.find()
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async getAStudent(params) {
    try {
      return await Student.findOne(params)
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async updateStudent(_id, update) {
    try {
      return await Student.findOneAndUpdate({ _id }, update, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }

  static async countId() {
    try {
      return await Student.countDocuments('regNum');
    } catch (error) {
      throw error;
    }
  }
}

export default StudentService;
