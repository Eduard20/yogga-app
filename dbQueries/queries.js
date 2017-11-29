
/**
 * Module Dependencies
 */

const mongoose = require('mongoose');
const config = require('../config');
const winston = require('winston');
const text = require('../tetxs/index');
const async = require('async');
const _ = require('lodash');
const tokenFunction = require('../modules/token');
const {
    UsersModel,
    RecordsModel
} = require('./models');

mongoose.Promise = Promise;

const connectMongo = () => {
    mongoose.connect(config.mainMongo.url, config.mainMongo.options);
};

connectMongo();

mongoose.connection.on('connected', () => {
    winston.log('info', text.mongoConnection);
});
mongoose.connection.on('error', err => {
    winston.log('error', err);
    setTimeout(connectMongo, 5000);
});

const queries = {

    /**
     * Register
     * @param {Object} data
     * @param {Function} next
     */

    register: (data, next) => {
        const Data = data;
        async.waterfall([

            callback => {
                UsersModel.find({ email: data.email }, null, { lean: true })
                    .then(doc => callback(null, doc),
                        err => callback(err));
            },

            (doc, callback) => {
                if (!_.isEmpty(doc)) {
                    return callback({
                        error: true, message: text.usernameExists, status: 200
                    });
                }
                Data.token = tokenFunction.generate(Data);
                callback(null);
            },

            callback => {
                UsersModel.create(data, err => err ? callback(err) : callback(err, Data));
            }

        ], (err, result) => err ? next(err) : next(null, result));
    },

    /**
     * Login
     * @param {Object} data
     * @param {Function} next
     */


    login: (data, next) => {
        async.waterfall([
            callback => {
                UsersModel.findOne({ email: data.email }, null, { lean: true })
                    .then(doc => callback(null, doc),
                        err => callback(err));
            },

            (doc, callback) => {
                if (!_.isEmpty(doc)) return callback(null, doc);
                callback({ error: true, message: text.dataIncorrect, status: 200 });
            },

            (doc, callback) => {
                if (data.password === doc.password) {
                    return callback(null, doc);
                }
                callback({ error: true, message: text.dataIncorrect, status: 200 });
            }

        ], (err, result) => err ? next(err) : next(null, result));
    },

    /**
     * Find Token
     * @param {String} token
     * @param {Function} next
     */

    checkToken: (token, next) => {
        UsersModel.findOne({ token }, null, { lean: true })
            .then(doc => {
                if (!_.isEmpty(doc)) return next(null, doc);
                return next({ message: text.tokenNotFound });
            }, err => next(err));
    },

    /**
     * Add Record
     * @param {Object} data
     * @param {Function} next
     */

    addRecord: (data, next) => {
        RecordsModel.create(data, (err, doc) => err ? next(err) : next(err, doc));
    },

    /**
     * Edit Record
     * @param {String} id
     * @param {Object} data
     * @param {Function} next
     */

    editRecord: (id, data, next) => {
        RecordsModel.update({ _id: id }, data, err => err ? next(err) : next(err, data));
    },

    /**
     * Delete Record
     * @param {String} id
     * @param {Function} next
     */

    deleteRecord: (id, next) => {
        RecordsModel.findByIdAndRemove(id, err => next(err))
    },

    /**
     * Get Records
     * @param {String} email
     * @param {Function} next
     */

    getRecords: (email, next) => {
        RecordsModel.find(email, null, { lean: true })
            .then(doc => next(null, doc), err => next(err))
    },

    /**
     * Get Record By Id
     * @param {String} email
     * @param {String} _id
     * @param {Function} next
     */

    getOne: (email, _id, next) => {
        RecordsModel.findOne({email, _id}, null, { lean: true })
            .then(doc => next(null, doc), err => next(err))
    }


};

module.exports = queries;

