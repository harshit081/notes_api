const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendPasswordResetEmail(email, token) {
  const resetUrl = `http://localhost:8080/reset-password/${token}`;
  const mailOptions = {
    from: '"Your Name" <your-email@gmail.com>',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetUrl}`,
    html: `<p>Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendPasswordResetEmail };
