var module = angular.module('notee', ['models.note']);

module.controller('mainController', ['$scope', 'Note', function($scope, Note) {

  $scope.reloadNotes = function() {
    Note.query().$promise.then(function (notes) {
      $scope.notes = notes;
    });
  };

  $scope.saveNote = function() {
    console.log('save note');
    var note = new Note({text: $scope.text});
    note.$save();
    $scope.text = '';
    $scope.reloadNotes();
  };

  $scope.deleteNote = function(note) {
    Note.delete({id: note._id});
    $scope.reloadNotes();
  };

  $scope.reloadNotes();
}]);

function getScope() {
  var ctrlElement = document.getElementById('container');
  return angular.element(ctrlElement).scope();
}
