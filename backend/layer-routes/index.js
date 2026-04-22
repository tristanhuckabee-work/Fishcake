const express = require("express");
const router = express.Router();

const apiRouter = require("./routes-api.js");
const assetRouter = require("./routes-assets.js");
const sessionRouter = require("./routes-session.js");
const ticketRouter = require("./routes-tickets.js");
const userRouter = require("./routes-users.js");
// ----------------------------------------------------------------------------

router.use("/api", apiRouter);
router.use("/assets", assetRouter);
router.use("/session", sessionRouter);
router.use("/tickets", ticketRouter);
router.use("/users", userRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
  });
};

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

// ----------------------------------------------------------------------------
module.exports = router;