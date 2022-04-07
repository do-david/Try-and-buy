const express = require('express');
const router = express.Router();
const notificationsRouter = require('./notifications.route');

router.use(notificationsRouter);

module.exports = router;