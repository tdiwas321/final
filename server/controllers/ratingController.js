const express = require('express');
const router = express.Router();
const venue = require('../models/venue')

router.post('/addreview', async (req, res) => {
  const { rating, comment, venueID, userID, username } = req.body;

  const review = {
    user: userID,
    username: username,
    rating: Number(rating),
    comment: comment,
  };

  try {
    const venues = await venue.findById(venueID);

    const checkreview = await venue.findOne({ 'reviews.user': userID });
    const isReviewed = checkreview ? true : false;

    if (isReviewed) {
      const update = await venue.findOneAndUpdate(
        { 'reviews.user': userID },
        { $set: { 'reviews.$.comment': req.body.comment, 'reviews.$.rating': req.body.rating } },
        { new: true } // Return the updated document
      );

      const totalRatings = update.reviews.reduce((acc, item) => item.rating + acc, 0);
      const ratings = totalRatings / update.numOfReview;
      update.ratings = ratings.toFixed(1);
      await update.save();

      res.status(200).json({
        success: true,
        message: 'Review updated successfully',
      });
    } else {
      venues.reviews.push(review);
      venues.numOfReview = venues.reviews.length;

      await venues.save();

      const updatedVenues = await venue.findById(venueID);
      const totalRatings = updatedVenues.reviews.reduce((acc, item) => item.rating + acc, 0);
      const ratings = totalRatings / updatedVenues.numOfReview;
      updatedVenues.ratings = ratings.toFixed(1);
      await updatedVenues.save();

      res.status(200).json({
        success: true,
        message: 'Review added successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});


router.get('/getreview/:id', async (req, res) => {
  const venues = await venue.findById(req.params.id);

  res.status(200).json({
    success: true,
    reviews: venues.reviews
  })
})

router.get('/userreviews/:id', async (req, res) => {
  try {
    const userReviews = await venue.find({ 'reviews.user': req.params.id }, { 'reviews.$': 1 })
      .populate('reviews.user', 'username')
      .populate('name', 'name');
    res.status(200).json({ success: true, data: userReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const venueWithReview = await venue.findOne({ 'reviews._id': req.params.id });
    if (!venueWithReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    await venue.updateOne({ 'reviews._id': req.params.id }, { $pull: { reviews: { _id: req.params.id } }, $inc: { numOfReview: -1 } });
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;