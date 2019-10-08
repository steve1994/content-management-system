var express = require('express');
var router = express.Router();
const Datadate = require('../models/datadate');

router.get('/', function(req, res) {
    Datadate.find(function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
});

router.get('/:id', function(req, res) {
    Datadate.findById(req.params.id, function (err, response) {
        if (err) {
            res.status(400).json({success:false,message:err});
        } else {
            if (response) {
                res.status(200).json({success:true,message:'data found',data:response});
            } else {
                res.status(200).json({success:true,message:'data not found'});
            }
        }
    })
})

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let letter = req.body.letter;
    let frequency = req.body.frequency;
    Datadate.findOneAndUpdate({'_id':id},{'letter':letter,'frequency':frequency},function (err,writeResult) {
        if (err) {
            res.status(400).json({success:false,'error':err});
        } else {
            res.status(201).json({success:true,message:'data have been updated',data:writeResult});
        }
    })
})

router.post('/', function (req, res) {
    let letter = req.body.letter;
    let frequency = req.body.frequency;
    try {
        const newDatadate = new Datadate({'letter':letter,'frequency':frequency});
        newDatadate.save().then((dataCreated) => {
            res.status(201).json({success:true,message:'data have been added',data:dataCreated});
        })
    } catch (error) {
        res.status(400).json({success:false,'error':error.message});
    }
})

router.delete('/:id',function (req,res) {
    let id = req.params.id;
    Datadate.findOneAndDelete({'_id':id},function (err,response) {
        if (err) {
            res.status(400).json({success:false,message:err});
        } else {
            res.status(201).json({success:true,message:'data has been deleted',data:response})
        }
    })
})

router.post('/search',function (req, res) {
    let filterSearch = {letter:req.body.letter,frequency:req.body.frequency};
    if (!req.body.letter) {
        delete filterSearch['letter'];
    }
    if (!req.body.frequency) {
        delete filterSearch['frequency'];
    }
    Datadate.find(filterSearch, function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
})

module.exports = router;
