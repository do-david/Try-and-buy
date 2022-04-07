const express = require('express');
const router = express.Router();
const notifications = require('../controllers/notification.controller');

router.post('/notification/accept-offer', notifications.acceptedOffer);
router.post('/notification/sent-product',notifications.sentProduct);
router.post('/notification/paid-product',notifications.paidProduct);

module.exports = router;