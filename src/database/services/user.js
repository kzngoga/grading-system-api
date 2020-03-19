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

  static async getAllUsers(params) {
    try {
      return await User.find(params, '-password -__v');
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(params) {
    try {
      return await User.deleteOne(params);
    } catch (error) {
      throw error;
    }
  }

  static async delChangeUser(_id, update) {
    try {
      return await User.findOneAndUpdate({ _id }, update, {
        new: true
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
