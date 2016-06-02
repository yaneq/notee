var module = angular.module('notee.directives.taggedText', ['ngSanitize']);
module.directive('taggedText', function ($compile) {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    link: function (scope, element, attrs, controllers) {
      if (scope.text) {
        element.append(scope.text.replace(/(#\S+)/, '<tag>$1</tag>'));
        $compile(element)(scope);
      }
    }
  }
});
