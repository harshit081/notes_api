const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to the protected dashboard!' });
});

module.exports = router;
