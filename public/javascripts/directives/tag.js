var module = angular.module('notee.directives.tag', ['ngSanitize']);
module.directive('tag', function ($compile) {
  return {
    restrict: 'E',
    link: function (scope, element, attrs, controllers) {
      element.on('click', function() {
        scope.$emit('tagClicked', element.text())
      })
    }
  }
});
