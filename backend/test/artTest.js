let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let expect = chai.expect;
chai.use(chaiHttp);

let sampleArt = "";

describe('retrieve all art and allow user to add new piece', () => {
    it('should log in, fetch all artworks that belong to specific user, and add two art pieces from different sources', (done) => {
        let sample = {
            username: "demo",
            password: "Demo1234!"
        }
        chai.request(server) //login
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('token');
                expect(res.body.error).to.be.equal(undefined);
                const token = res.body.token;
                chai.request(server) //fetch
                    .get('/api/art')
                    .set({ 'Authorization': `Bearer ${token}` })
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        let initial = res.body.length;
                        let submission_1 = {
                            source: "https://www.artstation.com/artwork/6bYPPN",
                            pieceIndex: 1,
                            artSite: 'Artstation'
                        }
                        let submission_2 = {
                            source: "https://twitter.com/Alariko_/status/1605914911883857921?s=20",
                            pieceIndex: 1,
                            artSite: 'Twitter'
                        }
                        chai.request(server) //add artstation art
                            .post('/api/art')
                            .set({ 'Authorization': `Bearer ${token}` })
                            .send(submission_1)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(200);
                                expect(res.body).to.be.a('object');
                                expect(res.body.source).to.equal(submission_1.source);
                                sampleArt = res.body._id;
                                chai.request(server) //add twitter art
                                        .post('/api/art')
                                        .set({ 'Authorization': `Bearer ${token}` })
                                        .send(submission_2)
                                        .end((err, res) => {
                                            expect(res.status).to.be.equal(200);
                                            expect(res.body).to.be.a('object');
                                            expect(res.body.source).to.equal(submission_2.source);
                                            chai.request(server) //fetch again and compare the size of the arrays
                                            .get('/api/art')
                                            .set({ 'Authorization': `Bearer ${token}` })
                                            .end((err, res) => {
                                                expect(res.body.length).to.equal(initial + 2);
                                                done();
                                            });
                                        });
                                        
                            });
                    });
            });
    });
});

describe('retrieve all art and fail when user attempts to submit incomplete form', () => {
    it('should log in, fetch all artworks that belong to specific user, and fail to add an art piece', (done) => {
        let sample = {
            username: "demo",
            password: "Demo1234!"
        }
        chai.request(server) //login
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('token');
                const token = res.body.token;
                chai.request(server) //fetch
                    .get('/api/art')
                    .set({ 'Authorization': `Bearer ${token}` })
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        let invalidSubmission = {
                            source: "",
                            pieceIndex: 1,
                            artSite: 'Artstation'
                        }
                        chai.request(server)
                            .post('/api/art')
                            .set({ 'Authorization': `Bearer ${token}` })
                            .send(invalidSubmission)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(400);
                                expect(res.body.error).to.be.equal('Art validation failed: title: Path `title` is required., artist: Path `artist` is required., source: Path `source` is required., imageLink: Path `imageLink` is required.');
                                done();
                            });
                });
            });
    });
});

describe('retrieve all art and allow user to delete the recently piece', () => {
    it('should log in, fetch all artworks that belong to specific user, and delete an art piece', (done) => {
        let sample = {
            username: "demo",
            password: "Demo1234!"
        }
        chai.request(server)
            .post('/api/user/login')
            .send(sample)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('token');
                const token = res.body.token;
                chai.request(server) //fetch
                    .get('/api/art')
                    .set({ 'Authorization': `Bearer ${token}` })
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        let initial = res.body.length;
                        const deleteRequest = '/api/art/' + sampleArt;
                        chai.request(server) //delete
                            .delete(deleteRequest)
                            .set({ 'Authorization': `Bearer ${token}` })
                            .end((err, res) => {
                                expect(res.status).to.be.equal(200);
                                chai.request(server) //fetch again and compare the size of the arrays
                                    .get('/api/art')
                                    .set({ 'Authorization': `Bearer ${token}` })
                                    .end((err, res) => {
                                        expect(res.body.length).to.equal(initial - 1);
                                        done();
                                    });
                            });
                    });
            });
    });

});