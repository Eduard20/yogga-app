
/**
 * Module Dependencies
 */

const router = require('express').Router();
const recordFunction = require('../modules/record');

router.get('/', (req, res) => {
   res.send('good');
});

router.get('/records', (req, res) => {

});

router.post('/record', (req, res) => {
    recordFunction.add(req.body, result => res.send(result));
});

router.put('/record', (req, res) => {

});

router.delete('/record', (req, res) => {

});

module.exports = router;