var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Note = mongoose.model('Note', { text: String });

router.delete('/:id', function(req, res, next) {
  console.log('delete');
  Note.find({_id: req.params.id}, function (err, notes) {
    note = notes[0];
    note.remove();
    res.json(note);
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = req.query.q,
    callback = function(err, notes) {
      res.json({data: notes});
    };

  Note.find({
    text: new RegExp(query)},
    callback
  )
});

router.post('/', function(req, res, next) {
  console.log('post');
  var note = new Note(req.body);
  note.save(function(err, note) {
    if (err) {
      return console.error(err);
    }
    res.json({data:note});
  });
});

module.exports = router;
