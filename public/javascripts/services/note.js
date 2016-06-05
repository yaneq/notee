var module = angular.module('models.note',['ngResource']);

module.factory('Note', ['$resource', function($resource) {
  return $resource('/api/notes/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: [
        angular.fromJson,
        requestTransformers.pluckData,
        requestTransformers.timestampsToDate
      ]
    },
    save: {
      method: 'POST',
      transformResponse: [
        angular.fromJson,
        requestTransformers.pluckData
      ]
    },
    delete: {
      method: 'DELETE',
      params: {id: '@id'}
    }
  });
}]);
