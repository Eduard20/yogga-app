
const tokenFunction = require('./token');

const helper = {

    addEmail: (token, data) => {
        data.email = tokenFunction.decode(token);
        return data;
    }

};

module.exports = helper;