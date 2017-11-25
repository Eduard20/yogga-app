
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
     * @param {String} id
     * @param {Object} data
     * @param {Function} next
     * @returns {*}
     */

    edit: (id, data, next) => {

        if (_.isEmpty(data)) return next({message: text.validationError});

        mongoRequests.editRecord(id, data, (err, data) => {
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