
/**
 * Module Dependencies
 */

const winston = require('winston');
const _ = require('lodash');
const text = require('../tetxs/index');
const mongoRequests = require('../dbQueries/queries');
const helperFunction = require('./helper');
const tokenFunction = require('./token');
const moment = require('moment');

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
        let time = moment(Data.time).utc().format("HH:mm:ss");
        const minutes = moment(time, 'hh:mm:ss').diff(moment().startOf('day'), 'minutes');
        Data.speed = Math.floor(Data.dist / minutes);
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
        let time = moment(data.time).utc().format("HH:mm:ss");
        const minutes = moment(time, 'hh:mm:ss').diff(moment().startOf('day'), 'minutes');

        data.speed = Math.floor(data.dist / minutes);

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

    },

    /**
     * Get Function For Records
     * @param {String} token
     * @param {Function} next
     */

    get: (token, next) => {
        const email = tokenFunction.decode(token);
        mongoRequests.getRecords(email, (err, data) => {
            if (err) {
                winston.log('error', err);
                return next({
                    status: 'Failed',
                    error: err
                })
            }
            return next({
                status: 'OK',
                payload: data.map(item => ({
                        ...item,
                        time: moment(item.time).utc().format('HH:mm:ss')
                    })
                )
            });
        })
    },

    /**
     * Get Function For Single Record
     * @param {Object} req
     * @param {Function} next
     */

    getOne: (req, next) => {
        const email = tokenFunction.decode(req.headers.authorization);
        mongoRequests.getOne(email, req.params.id, (err, data) => {
            if (err) {
                winston.log('error', err);
                return next({
                    status: 'Failed',
                    error: err
                })
            }
            return next({
                status: 'OK',
                payload: data
            });
        })
    }

};

module.exports = record;