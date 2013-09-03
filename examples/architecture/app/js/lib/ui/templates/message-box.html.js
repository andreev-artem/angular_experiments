angular.module("js/lib/ui/templates/message-box.html", []).run(function($templateCache) {
  $templateCache.put("js/lib/ui/templates/message-box.html",
    "<div class=\"modal-header\">" +
    "    <h3>{{ title }}</h3>" +
    "</div>" +
    "<div class=\"modal-body\">" +
    "    <p>{{ message }}</p>" +
    "</div>" +
    "<div class=\"modal-footer\">" +
    "    <button class=\"btn {{btn.cssClass}}\"" +
    "            ng:repeat=\"btn in buttons\"" +
    "            ng:click=\"close(btn.result)\">{{ btn.label }}</button>" +
    "</div> ");
});
