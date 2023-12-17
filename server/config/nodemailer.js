const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'partypalacebookingsystem123@gmail.com',
    pass: 'dxmylbbmrhsdzrbg'
  }
});

module.exports = transporter;