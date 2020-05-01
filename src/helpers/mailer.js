/* eslint-disable no-console */
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import config from '../config';

const mailer = async (emailToSend) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SENDGRID_USER,
        pass: config.SENDGRID_PASS
      }
    });

    let template;
    let subject;
    switch (emailToSend[0]) {
      case 'sign-up':
        template = '../public/templates/signUp.ejs';
        subject = 'Login Info';
        break;
      case 'reset-password':
        template = '../public/templates/resetPassword.ejs';
        subject = 'Password Reset';
        break;
      case 'teacher-sign-up':
        template = '../public/templates/teacherSignUp.ejs';
        subject = 'Login Info';
        break;
      default:
        template = '';
    }

    return ejs.renderFile(path.join(__dirname, template), emailToSend[1], (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const emailOptions = {
          from: '"Grading System" <support@gradingsystem.com>',
          to: emailToSend[2],
          subject,
          html: data
        };
        transporter.sendMail(emailOptions)
          .then(() => console.log)
          .catch(() => console.error);
      }
    });
  } catch (error) {
    throw error;
  }
};

export default mailer;
