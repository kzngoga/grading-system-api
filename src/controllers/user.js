import UserService from '../database/services/user';
import genpass from '../helpers/generatePassword';
import mailer from '../helpers/mailer';
import out from '../helpers/response';
import { generate, check } from '../helpers/bcrypt';
import { sign, verify } from '../helpers/jwt';

class UserController {
  static async signUp(req, res) {
    try {
      const { email } = req.body;
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
        body: process.env.USER_WEB
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
      const match = await check(user.password, password);
      if (!match) return out(res, 400, 'Password is incorrect', null, 'AUTHENTICATION_ERROR');
      user.password = undefined;
      user.__v = undefined;
      user._doc.token = await sign({ email: user.email, id: user._id, role: user.role });
      return out(res, 200, 'Logged in successfully', user);
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
}

export default UserController;
