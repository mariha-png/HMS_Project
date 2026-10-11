const express = require('express');
const router = express.Router();
const { getAllGuests, addGuest, checkOutGuest } = require('../controllers/guest_controller');

// Routes
router.get('/all-guests', getAllGuests);
router.post('/add-guest', addGuest);
router.delete('/check-out/:id', checkOutGuest);

module.exports = router;