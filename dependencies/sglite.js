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

        registerCoreTypes(registrar);

        return {
            isTypeOf: isTypeOf,
            define: registrar.register,
            types: registrar.types
        };
    }

    sglite.dependencies = dependencies;

    return sglite;
});