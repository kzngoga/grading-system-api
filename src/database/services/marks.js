import Marks from '../models/marks';

class MarksService {
  static async addMarks(marks) {
    try {
      return await Marks.create(marks);
    } catch (error) {
      throw error;
    }
  }

  static async getAllMarks() {
    try {
      return await Marks.find()
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async getSingleMarks(params) {
    try {
      return await Marks.findOne(params)
        .select('__v');
    } catch (error) {
      throw error;
    }
  }
}

export default MarksService;
