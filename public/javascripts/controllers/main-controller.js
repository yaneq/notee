var module = angular.module('notee', [
  'models.note',
  'notee.directives.taggedText',
  'notee.directives.tag',
  'angularMoment',
  'angular.filter'
]);

module.config(function($sceProvider) {
  $sceProvider.enabled(false);
});

module.controller('mainController',
  ['$scope', 'Note',
    function($scope, Note) {

  $scope.query = '';
  $scope.filters = {
    tags: []
  };
  $scope.allTags = [];

  $scope.extractTags = function (notes) {
    tags = notes.map(function (note) { return note.tags });
    tags = [].concat.apply([], tags);
    return _.uniq(tags);
  };

  $scope.buildQuery = function (query, filters) {
    return {
      query: query,
      "tags[]": filters.tags
    };
  };

  $scope.reloadNotes = function() {
    var queryParams = $scope.buildQuery($scope.query, $scope.filters);
    Note.query(queryParams).$promise.then(function (notes) {
      $scope.notes = notes;
      $scope.allTags = $scope.extractTags(notes);
    });
  };

  $scope.saveNote = function() {
    console.log('save note');
    var note = new Note({
      text: $scope.text
    });
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

  $scope.$on('tagClicked', function(event, tag) {
    $scope.filters.tags = [tag];
    $scope.reloadNotes();
  });

  $scope.reloadNotes();
}]);

function getScope() {
  var ctrlElement = document.getElementById('container');
  return angular.element(ctrlElement).scope();
}
