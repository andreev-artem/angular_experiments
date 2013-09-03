angular.module("js/lib/ui/templates/pagination.html", []).run(function($templateCache) {
  $templateCache.put("js/lib/ui/templates/pagination.html",
    "<div class=\"pagination\"><ul>" +
    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>" +
    "  </ul>" +
    "</div>" +
    "");
});
