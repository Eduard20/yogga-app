

/**
 * Module dependencies
 */

const should = require('chai').should();
const superagent = require('superagent');
const host = 'http://127.0.0.1:3000';
const _ = require('lodash');
const mongoose = require('mongoose');
const {
    UsersModel
} = require('../dbQueries/models');
const winston = require('winston');
const config = require('../config');

mongoose.Promise = Promise;

describe('register: negative cases', () => {

    it('It should answer that parameters are missing', done => {

        const body = {
            email: '',
            password: ''
        };

        superagent.post(`${host}/register`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('error');
                res.body.should.have.property('message').eql('Some parameters are missing');
                done();
            });
    });

    it('It should answer that username already exists', done => {

        const body = {
            email: 'esimonyan2014@gmail.com',
            password: 'eeeec',
            name: 'Eduard',
            surname: 'Simonyan'
        };

        superagent.post(`${host}/register`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('error');
                res.body.should.have.property('message').eql('Username already exists');
                done();
            });
    });
});

describe('register: positive case', () => {

    const number = _.sampleSize([1, 2, 3, 4, 5, 6, 7, 8, 10], 4);
    const result = number.reduce((i, j) => {
        return i.toString() + j;
    });

    const body = {
        email: `esimonyan${result}@gmail.com`,
        password: 'test',
        name: 'Eduard',
        surname: 'Simonyan'
    };

    before(done => {

        /**
         * MongoDB Default Connection
         */

        const connectMongo = () => {
            mongoose.connect(config.mainMongo.url, config.mainMongo.options);
        };

        connectMongo();

        mongoose.connection.on('connected', () => {
            done();
        });
        mongoose.connection.on('error', err => {
            winston.log('error', err);
            setTimeout(connectMongo, 5000);
        });
    });

    after(done => {
        UsersModel.remove({ email: body.email }, (err, doc) => {
            if (err) winston.log('error', err);
            done();
        });

    });

    it('It should successfully register', done => {

        superagent.post(`${host}/register`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('token');
                done();
            });
    });
});
