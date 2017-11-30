
/**
 * Module Dependencies
 */

const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');
const auth = require('./middlewares/auth').isAuth;
process.env.NODE_ENV = config.mode;

const routes = require('./routes/index');
const api = require('./routes/api');

const app = express();

/**
 * Other Middleware
 */

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(`${__dirname}/build`));
app.use(cors());
app.use((req, res, next) => {
    if ("OPTIONS" === req.method) {
        if (req.headers["access-control-request-headers"]) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Access-Control-Allow-Credentials', 'true');
        }
        return res.send();
    }
    next();
});

/**
 * Authentication Middleware
 */

app.use('/api', auth);

app.use('/', routes);
app.use('/api', api);

/**
 * Middleware For Not Found
 */

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * production error handler
 */

app.use((err, req, res, next) => {
    if (404 === err.status) {
        return res.sendFile(`${__dirname}/build/index.html`);
    }

    res.status(err.status || 500);
    res.json({message: err.message, error: err});
});

/**
 * Application listening on PORT
 */

app.listen(config.port, winston.log('info', `Node.js server is running at http://localhost:${config.port} 
    in ${process.env.NODE_ENV} mode with process id ${process.pid}`));

/**
 * Checking Uncaught Exceptions
 */

process.on('uncaughtException', err => {
    winston.log('error', (new Date).toUTCString() + ' uncaughtException:', err.message);
    winston.log('info', err.stack);
    process.exit(1);
});