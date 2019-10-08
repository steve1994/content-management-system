const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const Map = require('../models/map');

const should = chai.should();
chai.use(chaiHttp);

describe('maps',function () {

    Map.collection.drop();

    it('seharusnya dapat menambahkan map baru', function (done) {
        chai.request(server).
        post('/api/map/').
        send({title:'Cihampelas Walk',lat:-1.222323,lng:134.343414}).
        end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data.title.should.equal('Cihampelas Walk');
            res.body.data.lat.should.equal(-1.222323);
            res.body.data.lng.should.equal(134.343414);
            done();
        })
    })

    it('seharusnya dapat menampilkan list map baru yang ditambahkan', function (done) {
        chai.request(server).
        get('/api/map/').
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('Cihampelas Walk');
            res.body[0].lat.should.equal(-1.222323);
            res.body[0].lng.should.equal(134.343414);
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil find map berdasarkan id data', function (done) {
        chai.request(server).
        get('/api/map/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            get('/api/map/'+id).
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

    it('seharusnya dapat menampilkan hasil browse map berdasarkan title',function (done) {
        chai.request(server).
        post('/api/map/search').
        send({title:'Cihampelas Walk'}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('Cihampelas Walk');
            done();
        })
    })

    it('seharusnya dapat melakukan edit map berdasarkan id data',function (done) {
        chai.request(server).
        get('/api/map/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            put('/api/map/'+id).
            send({title:'Cihampelas Walk Street View',lat:-1.232423,lng:123.32323}).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been updated');
                res.body.data._id.should.equal(id);
                res.body.data.title.should.equal('Cihampelas Walk');
                res.body.data.lat.should.equal(-1.222323);
                res.body.data.lng.should.equal(134.343414);
                done();
            })
        })
    })

    it('seharusnya dapat melakukan delete map berdasarkan id data',function (done) {
        chai.request(server).
        get('/api/map/').
        end(function (err,res) {
            let id = res.body[0]._id;
            chai.request(server).
            delete('/api/map/'+id).
            end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been deleted');
                res.body.data._id.should.equal(id);
                res.body.data.title.should.equal('Cihampelas Walk Street View');
                res.body.data.lat.should.equal(-1.232423);
                res.body.data.lng.should.equal(123.32323);
                done();
            })
        })
    })
})
