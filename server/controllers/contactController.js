const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailer');

router.post('/send', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const mailOptions = {
    from: email,
    to: 'partypalacebookingsystem123@gmail.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: could not send email');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Email sent successfully');
    }
  });
});

module.exports = router;