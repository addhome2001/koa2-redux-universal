import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../../config';
import { authLogger } from './loggers';

export default {
  sendTokenMailer(host, email, token) {
    const transport = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        auth: {
          user: config.MAILER_USER,
          pass: config.MAILER_PASSWORD,
        },
      }),
    );

    const mailOptions = {
      to: email,
      from: 'Koa2_Redux_universal@mail.com',
      subject: 'Koa2_Redux_universal Password Reset',
      text: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${host}/reset/${token}
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (err) {
          authLogger.error(`Sent token mailer was failed.
            ${err}
          `);

          reject(err);
        }
        resolve();
      });
    });
  },

  resetPasswordSuccessfully(username, email) {
    const transport = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        auth: {
          user: config.MAILER_USER,
          pass: config.MAILER_PASSWORD,
        },
      }),
    );

    const mailOptions = {
      to: email,
      from: 'Koa2_Redux_universal@mail.com',
      subject: 'Koa2_Redux_universal Reset Password Successfully',
      text: `
        Hello,
        This is a confirmation that the password for your account ${username} has just been changed.
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (err) {
          authLogger.error(`Sent reset password mailer was failed.
            ${err}
          `);

          reject(err);
        }
        resolve();
      });
    });
  },
};
