const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailer');
const book = require('../models/book')

router.post('/book', (req, res) => {
  const bookername = req.body.bookername;
  const venuename = req.body.venuename;
  const venuemail = req.body.venuename;
  const bookermail = req.body.bookermail;
  const bookeddate = req.body.bookeddate;
  const mainmail = 'partypalacebookingsystem123@gmail.com'


  const mailOptions = {
    from: 'partypalacebookingsystem123@gmail.com',
    to: `${bookermail},${venuemail},${mainmail}`,
    subject: `${venuename} booked`,
    // text: `${venuename} has been booked by ${bookername} for ${bookeddate.slice(0, 10)}`
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;padding:2rem">
        <h1 style="color: #00ADB5;background-color:#393E46;">${venuename} Booked</h1>
          <h3 style="margin-bottom: 20px;">${venuename} has been booked by ${bookername} for ${bookeddate.slice(0, 10)}</h3>
          <h3 style="font-style: italic;">Thank you for using our booking system!</h3>
          <h3 style="font-style: italic;">Make sure to pay before the booked date!</h3>
        </p>
    </div>
`
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

router.get('/get', async (req, res) => {
  try {
    const books = await book.find({})
    res.json(books)
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
}
)

router.delete('/delete/:id', async (req, res) => {
  await book.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({
      status: 'Success',
      data: {}
    })
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})


router.put('/approve/:id', async (req, res) => {
  try {
    const booking = await book.findByIdAndUpdate(
      req.params.id,
      { $set: { approved: true } },
      { new: true }
    );
    res.json({ message: 'Booking approved', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error approving booking', error });
  }
});

router.post('/add', async (req, res) => {
  try {

    const bookdetail = new book(req.body)
    bookdetail.save()
      .then(() => res.json("new venue added"))
  }
  catch (err) {

    res.status(400).json({
      status: 'Failed',
      message: err
    }
    )
  };

})


router.get('/dateget/:id', async (req, res) => {
  const ven_ID = req.params.id;
  book.find({ venueID: ven_ID }, { _id: 0, bookeddate: 1 })
    .lean()
    .then(data => {
      const bookedDates = data.map(item => item.bookeddate);
      res.json(bookedDates);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching booked dates');
    });
});

router.get('/userbook/:id', async (req, res) => {
  const user_ID = req.params.id;
  book.find({ bookerID: user_ID })
    .then(data => {
      const userbookingdata = data
      res.json(userbookingdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error fetching booked dates')
    })
});
module.exports = router;