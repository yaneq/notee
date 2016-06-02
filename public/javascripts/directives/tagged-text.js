var module = angular.module('notee.directives', ['ngSanitize']);
module.directive('taggedText', function() {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    template: '<note ng-bind-html="format(text)"/>}',
    link: function(scope, element, attrs, controllers) {
      scope.format = function(text) {
        return text.replace(/(#\w+)/, '<span class="tag">$1</span>');
      }
    }
  }
});
