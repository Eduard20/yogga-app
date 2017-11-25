
/**
 * Module Dependencies
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

const tokenFunc = {

    /**
     * Generate JWT
     * @param {Object} data
     */

    generate: data => jwt.sign({ email: data.email }, config.jwtSecret),

    /**
     * Decode JWT
     * @param {String} token
     * @returns {*|string|string|string|email|{type, required, index}}
     */

    decode: token => {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded.email;
    },


};

module.exports = tokenFunc;
