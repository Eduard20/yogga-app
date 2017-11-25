const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
// const webpack = require('webpack');
const logger = require('morgan');
const config = require('./config');
const routes = require('./routes/index');
process.env.NODE_ENV = config.mode;
const app = express();
// const webPackConfig = require('./webpack.config');
//
// const compiler = webpack(webPackConfig);
//
// app.use(require('webpack-dev-middleware')(compiler, {
//     publicPath: webPackConfig.output.publicPath
// }));
// app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/', routes);


if ('development' === process.env.NODE_ENV) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({message: err.message, error: err});
    });
}

/**
 * production error handler
 */

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({message: err.message, error: {}});
});

/**
 * Application listening on PORT
 */

app.listen(config.port, config.hostname, winston.log('info', `Node.js server is running at http://${config.hostname}:${config.port} 
    in ${process.env.NODE_ENV} mode with process id ${process.pid}`));

/**
 * Checking Uncaught Exceptions
 */

process.on('uncaughtException', err => {
    winston.log('error', (new Date).toUTCString() + ' uncaughtException:', err.message);
    winston.log('info', err.stack);
    process.exit(1);
});