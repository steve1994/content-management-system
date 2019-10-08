var express = require('express');
var router = express.Router();
const Data = require('../models/data');

router.get('/', function(req, res) {
    Data.find(function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
});

router.get('/:id', function(req, res) {
    Data.findById(req.params.id, function (err, response) {
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
    Data.findOneAndUpdate({'_id':id},{'letter':letter,'frequency':frequency},function (err,writeResult) {
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
        const newData = new Data({'letter':letter,'frequency':frequency});
        newData.save().then((dataCreated) => {
            res.status(201).json({success:true,message:'data have been added',data:dataCreated});
        })
    } catch (error) {
        res.status(400).json({success:false,'error':error.message});
    }
})

router.delete('/:id',function (req,res) {
    let id = req.params.id;
    Data.findOneAndDelete({'_id':id},function (err,response) {
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
    Data.find(filterSearch, function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
})

module.exports = router;
