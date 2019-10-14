const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cmsdb', {useNewUrlParser: true});

const Datadate = require('../models/datadate');
const fileSystem = require('fs');

function insertBatchDatadates() {
    let objectDatadates = JSON.parse(fileSystem.readFileSync('./seeds/data.json','utf8'));
    Datadate.collection.insert(objectDatadates, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Multiple datadates inserted successfully');
        }
        process.exit();
    })
}

insertBatchDatadates();
