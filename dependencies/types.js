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
                function typeCheck(value) {
                    return typeof value === typeName;
                };

                typeCheck.arity = 1;

                return typeCheck;
            }

            return {
                any: () => true,
                number: checkTypeByName('number'),
                string: checkTypeByName('string')
            };
        }

        return types
    })());