var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Note = mongoose.model('Note', { text: String, tags: [String] });

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
  var query = req.query.query,
    tags = req.query.tags,
    searchParams = {};

  if (query) {
    searchParams.text = new RegExp(query);
  }
  if (tags) {
    searchParams.tags = { "$in": tags };
  }
  console.log(searchParams);
  Note.find(
    searchParams,
    function(err, notes) {
      res.json({data: notes});
    }
  )
});

router.post('/', function(req, res, next) {
  console.log('post');
  var text = req.body.text
    tags = text.match(/#\S+/g);

  var note = new Note({
      text: text,
      tags: tags
  });
  note.save(function(err, note) {
    if (err) {
      return console.error(err);
    }
    res.json({data:note});
  });
});

module.exports = router;
