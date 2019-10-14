var express = require('express');
var router = express.Router();
const Map = require('../models/map');

router.get('/', function(req, res) {
    Map.find(function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
});

router.get('/:id', function(req, res) {
    Map.findById(req.params.id, function (err, response) {
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
    let title = req.body.title;
    let lat = req.body.lat;
    let lng = req.body.lng;
    Map.findOneAndUpdate({'_id':id},{'title':title,'lat':lat,'lng':lng},function (err,writeResult) {
        if (err) {
            res.status(400).json({success:false,'error':err});
        } else {
            res.status(201).json({success:true,message:'data have been updated',data:writeResult});
        }
    })
})

router.post('/', function (req, res) {
    let title = req.body.title;
    let lat = req.body.lat;
    let lng = req.body.lng;
    try {
        const newMap = new Map({'title':title,'lat':lat,'lng':lng});
        newMap.save().then((dataCreated) => {
            res.status(201).json({success:true,message:'data have been added',data:dataCreated});
        })
    } catch (error) {
        res.status(400).json({success:false,'error':error.message});
    }
})

router.delete('/:id',function (req,res) {
    let id = req.params.id;
    Map.findOneAndDelete({'_id':id},function (err,response) {
        if (err) {
            res.status(400).json({success:false,message:err});
        } else {
            res.status(201).json({success:true,message:'data has been deleted',data:response})
        }
    })
})

router.post('/search',function (req, res) {
    let filterSearch = {title:req.body.title};
    if (!req.body.title) {
        delete filterSearch['title'];
    }
    Map.find(filterSearch, function(err, response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
})

module.exports = router;
