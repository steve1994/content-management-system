const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const Datadate = require('../models/datadate');

const should = chai.should();
chai.use(chaiHttp);

describe('datadates',function () {

    Datadate.collection.drop();

    it('seharusnya dapat menambahkan datadate baru', function (done) {
        chai.request(server).
        post('/api/datadate/').
        send({letter:'2018-01-10',frequency:1.34}).
        end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data.letter.should.equal(new Date('2018-01-10').toISOString());
            res.body.data.frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan list datadate baru yang ditambahkan', function (done) {
        chai.request(server).
        get('/api/datadate/').
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal(new Date('2018-01-10').toISOString());
            res.body[0].frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil find datadate berdasarkan id data', function (done) {
        chai.request(server).
        get('/api/datadate/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            get('/api/datadate/'+id).
            end(function (err,res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data found');
                res.body.data._id.should.equal(id);
                done();
            })
        })
    })

    it('seharusnya dapat menampilkan hasil browse datadate berdasarkan letter dan frequency',function (done) {
        chai.request(server).
        post('/api/datadate/search').
        send({letter:'2018-01-10',frequency:1.34}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal(new Date('2018-01-10').toISOString());
            res.body[0].frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil browse data berdasarkan letter saja',function (done) {
        chai.request(server).
        post('/api/datadate/search').
        send({letter:'2018-01-10'}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal(new Date('2018-01-10').toISOString());
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil browse data berdasarkan frequency saja',function (done) {
        chai.request(server).
        post('/api/datadate/search').
        send({frequency:1.34}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat melakukan edit data berdasarkan id data',function (done) {
        chai.request(server).
        get('/api/datadate/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            put('/api/datadate/'+id).
            send({letter:'2018-09-09',frequency:1.89}).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been updated');
                res.body.data._id.should.equal(id);
                res.body.data.letter.should.equal(new Date('2018-01-10').toISOString());
                res.body.data.frequency.should.equal(1.34);
                done();
            })
        })
    })

    it('seharusnya dapat melakukan delete data berdasarkan id data',function (done) {
        chai.request(server).
        get('/api/datadate/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            delete('/api/datadate/'+id).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been deleted');
                res.body.data._id.should.equal(id);
                res.body.data.letter.should.equal(new Date('2018-09-09').toISOString());
                res.body.data.frequency.should.equal(1.89);
                done();
            })
        })
    })
})
