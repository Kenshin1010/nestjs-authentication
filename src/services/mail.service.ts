import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'oren.murray@ethereal.email',
        pass: 'ECYf7xqj1TCzXCTWjZ',
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to,
      subject: 'Password Reset Request',
      html: `
        <h1>Reset Password</h1>
        <p>To reset your password, please click on the following link:</p>
        <a href="${resetLink}">Reset Password</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
