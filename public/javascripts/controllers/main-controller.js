var module = angular.module('notee', ['models.note', 'notee.directives']);

module.controller('mainController', ['$scope', 'Note', function($scope, Note) {

  $scope.reloadNotes = function() {
    Note.query().$promise.then(function (notes) {
      $scope.notes = notes;
    });
  };

  $scope.saveNote = function() {
    console.log('save note');
    var note = new Note({text: $scope.text});
    note.$save(function() {
      $scope.reloadNotes();
    });
    $scope.text = '';

  };

  $scope.deleteNote = function(note) {
    Note.delete({id: note._id}, function() {
      $scope.reloadNotes();
    });
  };

  $scope.reloadNotes();
}]);

function getScope() {
  var ctrlElement = document.getElementById('container');
  return angular.element(ctrlElement).scope();
}
