const venue = require('../models/venue');
express = require('express');
router = express.Router();

router.post('/filtervenue', async (req, res) => {
  try {
    const { location, capacity, ratings, price } = req.body

    const filters = {}
    if (location) filters.location = location
    if (capacity) filters.capacity = capacity
    if (ratings) filters.ratings = ratings
    if (price) filters.price = { $lte: price }

    const filteredvenue = await venue.find(filters)

    res.json(filteredvenue)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
module.exports = router;