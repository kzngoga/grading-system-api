import Course from '../models/course';

class CourseService {
  static async addCourse(course) {
    try {
      return await Course.create(course);
    } catch (error) {
      throw error;
    }
  }

  static async getSingleCourse(params) {
    try {
      return await Course.findOne(params)
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async getAllCourses() {
    try {
      return await Course.find()
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  static async updateCourse(_id, update) {
    try {
      return await Course.findOneAndUpdate({ _id }, update, {
        new: true
      }).select('-__v');
    } catch (error) {
      throw error;
    }
  }
}

export default CourseService;
