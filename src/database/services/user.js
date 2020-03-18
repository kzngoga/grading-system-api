import User from '../models/user';

class UserService {
  static async addUser(newUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(params) {
    try {
      return await User.findOne(params);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(filter, update) {
    try {
      return await User.findOneAndUpdate(filter, update, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
