
/**
 * Module Dependencies
 */

const async = require('async');
const _ = require('lodash');
const text = require('../tetxs/index');
const mongoRequests = require('../dbQueries/queries');

const record = {

    add: (data, next) => {

        if (_.isEmpty(data)) return next({message: text.validationError});

        mongoRequests.addRecord(data, (err, data) => {
            if (err) return next(null);
            return next(data)
        });

    }

};

module.exports = record;