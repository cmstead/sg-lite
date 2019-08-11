(function (moduleFactory) {
    if (typeof dject !== 'undefined') {
        dject.register(
            moduleFactory,
            moduleFactory.name,
            moduleFactory.dependencies
        );
    } else {
        module.exports = moduleFactory;
    }
})(
    (function () {
        types.dependencies = [];

        function types({}) {

            function checkTypeByName(typeName) {
                return function(value) {
                    return typeof value === typeName;
                }
            }

            return {
                any: () => true,
                number: checkTypeByName('number')
            };
        }

        return types
    })());