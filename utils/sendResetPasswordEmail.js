const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');

// Create a transport object using Postmark
const transporter = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: process.env.POSTMARK_API_KEY,
  },
}));

const sendResetPasswordEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your verified Postmark email address
    to: email,
    subject: 'Reset your password',
    text: `Click this link to reset your password: http://localhost:8080/api/auth/reset-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reset password email:', error);
    } else {
      console.log('Reset password email sent:', info.response);
    }
  });
};

module.exports = sendResetPasswordEmail;
