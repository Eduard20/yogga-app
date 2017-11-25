
/**
 * Module Dependencies
 */

const router = require('express').Router();

router.get('/', (req, res) => {
   res.send('good');
});

module.exports = router;