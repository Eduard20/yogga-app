
/**
 * Module Dependencies
 */

const winston = require('winston');
const _ = require('lodash');
const text = require('../tetxs/index');
const mongoRequests = require('../dbQueries/queries');

const record = {

    /**
     * Add Function For Record
     * @param {Object} data
     * @param {Function} next
     * @returns {*}
     */

    add: (data, next) => {

        if (_.isEmpty(data)) return next({message: text.validationError});

        mongoRequests.addRecord(data, (err, data) => {
            if (err) return next(null);
            return next(data)
        });

    },

    /**
     * Edit Function For Record
     * @param {Object} data
     * @param {Function} next
     * @returns {*}
     */

    edit: (data, next) => {

        if (_.isEmpty(data)) return next({message: text.validationError});

        mongoRequests.editRecord(data, (err, data) => {
            if (err) return next(null);
            return next(data)
        });

    },

    /**
     * Delete Function For Record
     * @param {Object} data
     * @param {Function} next
     * @returns {*}
     */

    delete: (data, next) => {

        if (_.isEmpty(data)) return next({message: text.validationError});

        mongoRequests.deleteRecord(data._id, err => {
            if (err) {
                winston.log('error', err);
                return next(null)
            }

            return next(true)
        });

    }

};

module.exports = record;