angular.module("UiSourceModule", [])
    .directive('uiSource', function () {
        return {
            restrict: 'EA',
            terminal: true,
            compile: function (elem) {
                var escape = function(content) {
                    return content
                        .replace(/\&/g, '&amp;')
                        .replace(/\</g, '&lt;')
                        .replace(/\>/g, '&gt;')
                        .replace(/"/g, '&quot;');
                };

                var pre = angular.element('<pre class="prettyprint linenums"></pre>');
                pre.append(prettyPrintOne(escape(elem.html().slice(1)), undefined, true));
                elem.replaceWith(pre);
            }
        };
    });
