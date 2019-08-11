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
        sglite.dependencies = ['types'];

        function sglite({
            types
        }) {


            function checkTypeOf(type, value) {
                return type(value);
            }

            function isTypeOf(type) {
                return function (value) {
                    return checkTypeOf(type, value);
                }
            }

            return {
                isTypeOf,
                types
            };
        }

        return sglite;
    })());