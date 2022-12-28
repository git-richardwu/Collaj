let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let expect = chai.expect;
chai.use(chaiHttp);

describe('create a user', () => {
     it('should fail due to incomplete forms', (done) => {
        let sample = {
            username: "",
            password: ""
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Please fill in every field.');
                done();
        });
    });
    it('should fail due to invalid username', (done) => {
        let sample = {
            username: "a",
            password: "abcd1234!"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Invalid username. Username has to be 4-20 characters long. Can only contain letters, numbers, underscores, and hyphens.');
                done();
        });
    });
    it('should fail due to invalid password', (done) => {
        let sample = {
            username: "mocha",
            password: "abcd1234!"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Password is not strong enough. Must be minimum 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).');
                done();
        });
    });
    it('should successfully register new user', (done) => {
        let sample = {
            username: "mocha",
            password: "Abcd1234!"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('token');
                expect(res.body.error).to.be.equal(undefined);
                done();
        });
    });
    it('should fail due to duplicate username', (done) => {
        let sample = {
            username: "mocha",
            password: "Abcd1234!"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Username already in use.');
                done();
        });
    });
});

describe('log in user', () => {
    it('should fail due to incomplete forms', (done) => {
        let sample = {
            username: "",
            password: ""
        }
        chai.request(server)
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Please fill in every field.');
                done();
        });
    });
    it('should fail due to invalid login credentials (username)', (done) => {
        let sample = {
            username: "mochi",
            password: "Abcd1234!"
        }
        chai.request(server)
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('User not found.');
                done();
        });
    });
    it('should fail due to invalid login credentials (password)', (done) => {
        let sample = {
            username: "mocha",
            password: "wrongpassword"
        }
        chai.request(server)
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal('Invalid login credentials.');
                done();
        });
    });
    it('should successfully log in user', (done) => {
        let sample = {
            username: "mocha",
            password: "Abcd1234!"
        }
        chai.request(server)
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('token');
                expect(res.body.error).to.be.equal(undefined);
                done();
        });
    });
});