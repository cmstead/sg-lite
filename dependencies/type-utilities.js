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
        typeUtilities.dependencies = [];

        function typeUtilities({}) {

            function checkTypeOf(type, value) {
                return type(value);
            }

            function isTypeOf(type) {
                return function typeCheck(value) {
                    return checkTypeOf(type, value);
                }
            }

            return {
                isTypeOf
            };
        }

        return typeUtilities;
    })());