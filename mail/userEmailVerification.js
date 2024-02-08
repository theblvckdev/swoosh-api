require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const sendEmail = (options) => {
  const { email, subject, verificationUrl } = options;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    connectionTimeout: 300000,
    pool: true,
    logger: true,
    secure: false,
    debug: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    ignoreTLS: false,
  });

  const source = path.join(
    __dirname,
    '../email-views/userEmailVerification.handlebars'
  );
  console.log(source);

  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.handlebars',
        layoutsDir: './email-views',
        defaultLayout: 'userEmailVerification',
      },
      viewPath: './email-views/',
      extName: '.handlebars',
    })
  );

  const mailOptions = {
    from: `Swoosh <support@swoosh.com>`,
    to: email,
    subject,
    template: 'userEmailVerification',
    context: { email: email, url: verificationUrl },
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('ERROR 💣', err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendEmail;
