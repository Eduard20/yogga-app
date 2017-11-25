
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
    recordFunction.add(req.headers.authorization, req.body, result => res.send(result));
});

router.put('/record/:id', (req, res) => {
    recordFunction.edit(req, result => res.send(result));
});

router.delete('/record/:id', (req, res) => {
    recordFunction.delete(req.params.id, result => res.send(result));
});

module.exports = router;