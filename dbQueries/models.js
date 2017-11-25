const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Users Schema
 */

const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true }
}, {
    versionKey: false,
    strict: false
});

/**
 * Default Schema
 */

const defaultSchema = new Schema({}, {
    versionKey: false,
    strict: false
});

/**
 * User Model
 */

const UsersModel = mongoose.model('users', usersSchema);
const RecordsModel = mongoose.model('records', defaultSchema);

module.exports = {
    UsersModel,
    RecordsModel
};