(function (moduleFactory) {
    const isNode = typeof module === 'object'
        && typeof module.exports !== 'undefined';

    const moduleDefinition = moduleFactory();

    if (isNode) {
        module.exports = moduleDefinition;
    } else {
        container.register(moduleDefinition);
    }
})(function () {
    const dependencies = [
        'registrar',
        'registerCoreTypes'
    ];

    function sglite({
        registrar,
        registerCoreTypes
    }) {
        function isTypeOf(type) {
            return function (value) {
                return type(value);
            }
        }

        function verify() {
            return function (value) {
                return value;
            };
        }

        registerCoreTypes(registrar);

        return {
            define: registrar.register,
            isTypeOf: isTypeOf,
            types: registrar.types,
            verify: verify
        };
    }

    sglite.dependencies = dependencies;

    return sglite;
});