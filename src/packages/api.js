
import _ from 'lodash';

const baseSettings = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
};

function ApiError(message) {
    this.name = 'ApiError';
    this.ResultMessage = message;
    this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export default class api {
    static baseURI() {
        return `http://${window.location.hostname}:3000/api`;
    }

    static baseSettings() {
        return _.cloneDeep(baseSettings);
    }

    static fetch(relative, m = 'GET', data = null, opt = null) {

        // UpperCase() Type and check for valid entry
        const method = m.toUpperCase();

        if ([ 'GET', 'POST', 'DELETE', 'PUT' ].indexOf(method) == -1) {
            throw new Error('Illegal method \'' + method + '\' for FETCH Request');
        }

        // Fix customOptions if null/invalid
        const requestOptions = _.isPlainObject(opt) ? opt : {};

        // Construct Request URI
        const uri = api.baseURI() + relative;

        // Merge BaseSettings with onthefly-constructed RequestSettings
        // (2nd parameter is prioritized automatically)
        let options = Object.assign({}, baseSettings, { method });

        // Merge Options again with supplied customOptions
        // (2nd Parameter is prioritized again)
        if (requestOptions) {
            options = _.extend(true, options, requestOptions);
        }

        // necessary to get the new API response format
        options.headers['X-Api-Version'] = '2';

        // We want to send JSON and actually have data to send?
        // if (options.dataType.indexOf('json') === 0) {
        const contentTypes = options.headers && options.headers['Content-Type'];

        if (contentTypes && contentTypes.indexOf && contentTypes.indexOf('json') != -1) {
            if (options.body && (typeof options.body != 'string')) {
                // JSON.Stringify data for chocolate restful goodness
                options.body = JSON.stringify(options.body);
            } else if (data) {
                options.body = JSON.stringify(data);
            }
        } else {
            options.body = options.body || data || null;

        }

        // Fire the Request and Return the response promise Object
        return fetch(new Request(uri)).then(response => {
            if (response.ok) {
                return response;
            }
            response.json().then(r => {
                throw new ApiError(r.ExceptionMessage);
            });
        });
    }

    /* GET (retrieve) */
    static get(relative, options = null) {
        return api.fetch(relative, 'GET', null, options);
    }

    /* POST (update) */
    static post(relative, data, options = null) {
        return api.fetch(relative, 'POST', data, options);
    }

    /* DELETE (remove) */
    static delete(relative, options = null) {
        return api.fetch(relative, 'DELETE', null, options);
    }

    /* PUT (create) */
    static put(relative, data, options = null) {
        return api.fetch(relative, 'PUT', data, options);
    }
}
