const express = require('express');
const router = express.Router();

const apiRouter = require('./routes-api.js');
const assetRouter = require('./routes-assets.js');
const ticketRouter = require('./routes-tickets.js');
const userRouter = require('./routes-users.js');
// ----------------------------------------------------------------------------

router.use('/api', apiRouter);
router.use('/assets', assetRouter);
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

// ----------------------------------------------------------------------------
module.exports = router;