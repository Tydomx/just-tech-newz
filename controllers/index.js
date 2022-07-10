const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
// if req made to any endpoint that doesn't exist, receive 404 error indicating we've requested incorrect resource
router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;