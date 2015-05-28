var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//var db = require('mongoskin').db('mongodb://noteeApp:noteeApp@localhost:27017/notee');
var Note = mongoose.model('Note', { text: String });

/* GET users listing. */
router.get('/', function(req, res, next) {
  Note.find(function(err, notes) {
    res.json({data: notes});
  })
});

router.post('/', function(req, res, next) {
  var note = new Note(req.body.note);
  note.save(function(err, note) {
    if (err) {
      return console.error(err);
    }
    res.json({data:note});
  });
});

module.exports = router;
