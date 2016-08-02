var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/flowandsnow');

router.get('/', function(req, res) {
    var collection = db.get('rivers');
    collection.find({}, function(err, rivers){
        if (err) throw err;
      	res.json(rivers);
    });
});

router.post('/', function(req, res){
    var collection = db.get('rivers');
    collection.insert({
        name: req.body.name,
    }, function(err, river){
        if (err) throw err;

        res.json(river);
    });
});

router.get('/', function(){
    var collection = db.get('rivers');
    collection.find({}, function(err, river){
        if (err) throw err;
        console.log('hello');
      	res.json(river);
    });
});

router.get('/:state', function(req, res) {
    var collection = db.get('rivers');
    collection.findOne({state: req.params.state}, function(err, river){
        if (err) throw err;
        console.log('hi');
      	res.json(river);
    });
    
});


router.put('/:id', function(req, res){
    var collection = db.get('rivers');
    collection.update({
        _id: req.params.id
    },
    {
        name: req.body.name
    }, function(err, river){
        if (err) throw err;

        res.json(river);
    });
});

router.delete('/:id', function(req, res) {
   var collection = db.get('rivers');
   collection.remove({_id: req.params.id}, function(err, river) {
      if (err) throw err; 
      
      res.json(river);
   });
});



module.exports = router;