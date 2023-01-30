
const nodemailer = require('nodemailer');

const emailSender = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PSW
        }
      });
      console.log(options.message)
    const message = {
        from: `${process.env.SMTP_FROM} <${process.env.SMTP_PROVIDER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = emailSender;
