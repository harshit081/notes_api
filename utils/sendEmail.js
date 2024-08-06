const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');

const transporter = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: process.env.POSTMARK_API_KEY
  }
}));

const sendVerificationEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // The sender's email address
    to: email,
    subject: 'Verify your email',
    text: `Click this link to verify your email: http://localhost:8080/api/auth/verify-email?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendVerificationEmail;
