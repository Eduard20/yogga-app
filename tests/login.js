
/**
 * Module dependencies
 */

const should = require('chai').should();
const superagent = require('superagent');
const host = 'http://127.0.0.1:3000';

describe('registration-page: negative cases', () => {
    it('It should answer that parameters are missing', done => {

        const body = {
            email: '',
            password: ''
        };

        superagent.post(`${host}/login`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('error').eql(true);
                res.body.should.have.property('message').eql('Some parameters are missing');
                done();
            });
    });

    it('It should answer that password is incorrect', done => {

        const body = {
            email: 'esimonyan2014@gmail.com',
            password: 'eeeec'
        };

        superagent.post(`${host}/login`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('error');
                res.body.should.have.property('message').eql('Password is incorrect');
                done();
            });
    });

    it('It should answer that username is incorrect', done => {

        const body = {
            email: 'esimonyan2014',
            password: 'eeeec'
        };

        superagent.post(`${host}/login`)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('error');
                res.body.should.have.property('message').eql('Username is incorrect');
                done();
            });
    });
});

describe('registration-page: positive case', () => {
    it('It should successfully registration-page', done => {

        const body = {
            email: 'esimonyan2014@gmail.com',
            password: 'test'
        };

        superagent.post(`${host}/login`)
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
