const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const Data = require('../models/data');

const should = chai.should();
chai.use(chaiHttp);

describe('datas',function () {

    Data.collection.drop();

    it('seharusnya dapat menambahkan data baru', function (done) {
        chai.request(server).
        post('/api/data/').
        send({letter:'B',frequency:1.34}).
        end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data.letter.should.equal('B');
            res.body.data.frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan list data baru yang ditambahkan', function (done) {
        chai.request(server).
        get('/api/data/').
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('B');
            res.body[0].frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil find data berdasarkan id data', function (done) {
        chai.request(server).
        get('/api/data/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            get('/api/data/'+id).
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

    it('seharusnya dapat menampilkan hasil browse data berdasarkan letter dan frequency',function (done) {
        chai.request(server).
        post('/api/data/search').
        send({letter:'B',frequency:1.34}).
        end(function (err,res) {
            console.log(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('B');
            res.body[0].frequency.should.equal(1.34);
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil browse data berdasarkan letter saja',function (done) {
        chai.request(server).
        post('/api/data/search').
        send({letter:'B'}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('B');
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil browse data berdasarkan frequency saja',function (done) {
        chai.request(server).
        post('/api/data/search').
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
        get('/api/data/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            put('/api/data/'+id).
            send({letter:'C',frequency:1.89}).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been updated');
                res.body.data._id.should.equal(id);
                done();
            })
        })
    })

    it('seharusnya dapat melakukan delete data berdasarkan id data',function (done) {
        chai.request(server).
        get('/api/data/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            delete('/api/data/'+id).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been deleted');
                res.body.data._id.should.equal(id);
                done();
            })
        })
    })
})
