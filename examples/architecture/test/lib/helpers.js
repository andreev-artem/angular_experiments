beforeEach(function() {
    this.addMatchers({
        toEqualData: function(expected) {
            var notText = this.isNot ? " not" : "";
            this.message = function() {
                return "Expected '" + angular.mock.dump(expected) + "'" +
                        notText + " to equal '" + angular.mock.dump(this.actual) + "'.";
            };
            return angular.equals(this.actual, expected);
        }
    });
});
