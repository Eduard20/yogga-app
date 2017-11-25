
/**
 * Module Dependencies
 */

const winston = require('winston');
const _ = require('lodash');
const text = require('../tetxs/index');
const mongoRequests = require('../dbQueries/queries');
const helperFunction = require('./helper');

const record = {

    /**
     * Add Function For Record
     * @param {String} token
     * @param {Object} data
     * @param {Function} next
     * @returns {*}
     */

    add: (token, data, next) => {
        if (_.isEmpty(data)) return next({message: text.validationError});

        const Data = helperFunction.addEmail(token, data);

        mongoRequests.addRecord(Data, (err, data) => {
            if (err) return next(null);
            return next(data)
        });
    },

    /**
     * Edit Function For Record
     * @param {Object} req
     * @param {Function} next
     * @returns {*}
     */

    edit: (req, next) => {
        if (_.isEmpty(req.body)) return next({message: text.validationError});

        const data = helperFunction.addEmail(req.headers.authorization, req.body);

        mongoRequests.editRecord(req.params.id, data, (err, data) => {
            if (err) return next(null);
            return next(data)
        });

    },

    /**
     * Delete Function For Record
     * @param {String} id
     * @param {Function} next
     * @returns {*}
     */

    delete: (id, next) => {
        if (_.isEmpty(id)) return next({message: text.validationError});

        mongoRequests.deleteRecord(id, err => {
            if (err) {
                winston.log('error', err);
                return next(null)
            }

            return next(true)
        });

    }

};

module.exports = record;