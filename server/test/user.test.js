const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const User = require('../models/user');

const should = chai.should();
chai.use(chaiHttp);

describe('users',function () {

    beforeEach(function (done) {
        User.collection.drop();
        done();
    })

    it('seharusnya mendapatkan user yang baru teregistrasi', function (done) {
        chai.request(server).
        post('/api/users/register').
        send({email:'steve.harnadi@gmail.com',password:'1234',retypepassword:'1234'}).
        end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            res.body.data.email.should.equal('steve.harnadi@gmail.com');
            done();
        })
    })

    it('seharusnya mendapatkan user yang sedang login', function (done) {
        chai.request(server).
        post('/api/users/register').
        send({email:'steve.harnadi@gmail.com',password:'1234',retypepassword:'1234'}).
        end(function (err,res) {
            chai.request(server).
            post('/api/users/login').
            send({email:'steve.harnadi@gmail.com',password:'1234'}).
            end(function (err,res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.should.have.property('token');
                res.body.data.email.should.equal('steve.harnadi@gmail.com');
                done();
            })
        })
    })

    // it('seharusnya dapat melakukan pengecekan token user yang sedang login', function (done) {
    //     chai.request(server).
    //     post('/api/users/register').
    //     send({email:'steve.harnadi@gmail.com',password:'1234',retypepassword:'1234'}).
    //     end(function (err,res) {
    //         let token = res.body.token;
    //         chai.request(server).
    //         get('api/users/check').
    //         set('Authorization',token).
    //         end(function (err,res) {
    //             console.log(res);
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.have.property('valid');
    //             res.body.valid.should.equal(true);
    //             done();
    //         })
    //     })
    // })
})
