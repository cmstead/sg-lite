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
    const dependencies = [];

    function registerCoreTypes({ }) {
        function registerTypes(registrar) {
            function checkTypeOf(type) {
                return function (value) {
                    return typeof value === type;
                }
            }

            registrar.register('any', () => true);
            registrar.register('number', checkTypeOf('number'));
            registrar.register('string', checkTypeOf('string'));
            registrar.register('object', checkTypeOf('object'));
        }

        return registerTypes;
    }

    registerCoreTypes.dependencies = dependencies;

    return registerCoreTypes;
});