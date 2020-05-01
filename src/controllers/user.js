import UserService from '../database/services/user';
import genpass from '../helpers/generatePassword';
import mailer from '../helpers/mailer';
import out from '../helpers/response';
import { generate, check } from '../helpers/bcrypt';
import { sign, verify } from '../helpers/jwt';
import config from '../config';

class UserController {
  static async signUp(req, res) {
    try {
      const {
        email, firstname, lastname, role
      } = req.body;
      const userDuplicate = await UserService.findUser({ email });
      if (userDuplicate) {
        const message = 'Admin already registered';
        return out(res, 409, message, null, 'CONFLICT_ERROR');
      }
      const genpwd = await genpass();
      const hashedPassword = await generate(genpwd);
      req.body.password = hashedPassword;
      const createdUser = await UserService.addUser(req.body);
      createdUser.password = undefined;
      createdUser.__v = undefined;
      const EmailStatus = await mailer(['sign-up', {
        email,
        genpwd,
        firstname,
        lastname,
        role,
        body: process.env.GRADING_WEB
      }, email
      ]);
      if (EmailStatus) return out(res, 500, EmailStatus, null, 'SERVER_ERROR');
      return out(res, 201, 'Registered successfully', createdUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findUser({ email });
      if (!user) {
        const message = 'Email does not exist';
        return out(res, 404, message, null, 'NOT_FOUND');
      }
      if (user.status === 'OFF') return out(res, 404, 'Service not Available', null, 'NOT_FOUND');
      const match = await check(user.password, password);
      if (!match) return out(res, 400, 'Password is incorrect', null, 'AUTHENTICATION_ERROR');
      user.password = undefined;
      user.__v = undefined;
      // eslint-disable-next-line max-len
      user._doc.token = await sign({
        email: user.email, id: user._id, role: user.role, status: user.status
      });
      return out(res, 200, 'Logged in successfully', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async superAdmin(req, res) {
    try {
      const { username, password } = req.body;
      if (username !== config.SPNAME || password !== config.SPPASS) return out(res, 400, 'Username or Password is incorrect', null, 'AUTHENTICATION_ERROR');
      const token = await sign({ username, password, role: 'superadmin' });
      return out(res, 200, 'Logged in successfully', { username: config.SPNAME, role: 'superadmin', token });
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async changePassword(req, res) {
    try {
      const { email } = req.user;
      const { oldPassword, newPassword } = req.body;
      const userExist = await UserService.findUser({ email });
      const match = await check(userExist.password, oldPassword);
      if (!match) {
        return out(res, 400, 'Password is Incorrect', null, 'AUTHENTICATION_ERROR');
      }
      req.body.oldPassword = undefined;
      const hashedPassword = await generate(newPassword);
      req.body.newPassword = hashedPassword;
      userExist.password = hashedPassword;
      const updateUser = await UserService.updateUser({ email }, { password: hashedPassword });
      if (!updateUser) {
        const message = 'User Not Found ';
        return out(res, 404, message, null, 'NOT_FOUND');
      }
      updateUser.password = undefined;
      updateUser.__v = undefined;
      return out(res, 200, 'Password Changed Successfully', updateUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const userExist = await UserService.findUser({ email });
      if (userExist) {
        const errorOccured = await mailer(['reset-password', {
          email,
          body: `${process.env.HOST}/api/v1/user/new-password?token=${sign(email)}`
        }, email
        ]);
        if (errorOccured) return out(res, 500, errorOccured, null, 'SERVER_ERROR');
      }
      return out(res, 200, 'A password reset link was successfully sent link was successfully sent');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async newPassword(req, res) {
    try {
      const email = verify(req.query.token);
      const password = await generate(req.body.password);
      const status = await UserService.updateUser({ email }, { password });
      if (!status) return out(res, 500, 'Failed to reset password', null, 'SERVER_ERROR');
      return out(res, 200, 'Password reset successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateUser(req, res) {
    try {
      const { email } = req.user;
      const updateUser = await UserService.updateUser({ email }, req.body);
      if (!updateUser) {
        const message = 'User Not Found ';
        return out(res, 404, message, null, 'NOT_FOUND');
      }
      updateUser.password = undefined;
      updateUser.__v = undefined;
      return out(res, 200, 'Profile Updated Successfully', updateUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers({ $or: [{ role: 'Admin' }, { role: 'DOS' }] });
      if (users.length === 0) return out(res, 404, 'User not found', null, 'NOT_FOUND');
      return out(res, 200, 'Users retrieved', users);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deactivateUser(req, res) {
    try {
      const { users: usersId } = req.body;
      req.body.status = 'OFF';
      const user = await UserService.findUser({ _id: usersId });
      if (user.length === 0 || user.status === 'OFF') return out(res, 404, 'User not found', null, 'NOT_FOUND');
      const updateUser = await UserService.delChangeUser(
        { _id: usersId }, { status: req.body.status }
      );
      if (!updateUser) return out(res, 500, 'Can not deactivate User', null, 'NOT_FOUND');
      updateUser.password = undefined;
      updateUser.__v = undefined;
      return out(res, 200, 'User Deactivated', updateUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async activateUser(req, res) {
    try {
      const { users: usersId } = req.body;
      req.body.status = 'ON';
      const user = await UserService.findUser({ _id: usersId });
      if (user.length === 0 || user.status === 'ON') return out(res, 404, 'User not found', null, 'NOT_FOUND');
      const updateUser = await UserService.delChangeUser(
        { _id: usersId }, { status: req.body.status }
      );
      if (!updateUser) return out(res, 500, 'Can not activate User', null, 'NOT_FOUND');
      updateUser.password = undefined;
      updateUser.__v = undefined;
      return out(res, 200, 'User activated', updateUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findUser({ _id: id });
      if (!user || user.status === 'OFF') return out(res, 404, 'User not found', null, 'NOT_FOUND');
      const updateUser = await UserService.updateUser({ _id: id }, { role: req.body.role });
      if (!updateUser) return out(res, 500, 'Can not change User Role', null, 'NOT_FOUND');
      updateUser.password = undefined;
      updateUser.__v = undefined;
      return out(res, 200, 'User Role Updated', updateUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findUser({ _id: id });
      if (!user || user.status === 'OFF') return out(res, 404, 'User not found', null, 'NOT_FOUND');
      user.password = undefined;
      return out(res, 200, 'User Retrieved', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default UserController;
