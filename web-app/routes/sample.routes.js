const { Router } = require('express');

const router = Router();

const { sample } = require('../controllers');

// router.get('/', async (req, res, next) => {
//   res.send('Welcome to my API');
// });

router.get('/api', sample.getEntries);
router.post('/api', sample.postEntry);

router.get('/reset', sample.reset);

module.exports = router;
