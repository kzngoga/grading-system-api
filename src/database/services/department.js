import Department from '../models/department';

class DepartmentService {
  static async addDepartment(newDepartment) {
    try {
      return await Department.create(newDepartment);
    } catch (error) {
      throw error;
    }
  }

  static async findDepartment(params) {
    try {
      return await Department.findOne(params);
    } catch (error) {
      throw error;
    }
  }

  static async getAllDepartments() {
    try {
      return await Department.find()
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async updateDepartment(_id, update) {
    try {
      return await Department.findOneAndUpdate({ _id }, update, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }
}

export default DepartmentService;
