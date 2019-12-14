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
        'registerCoreTypes',
        'verificationSystem'
    ];

    function sglite({
        registrar,
        registerCoreTypes,
        verificationSystem
    }) {

        registerCoreTypes(registrar);

        return {
            define: registrar.register,
            isTypeOf: verificationSystem.isTypeOf,
            sign: verificationSystem.sign,
            types: registrar.types,
            verify: verificationSystem.verify
        };
    }

    sglite.dependencies = dependencies;

    return sglite;
});