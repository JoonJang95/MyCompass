const controller = require('./controllers/controllers.js');
const router = require('express').Router();
const path = require('path');

// Allow App rendering on any URL (Set up for React Router)
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Login API routes
router.post('/login', controller.checkLogin);

router.post('/signup');
router.delete('/');

module.exports = router;
