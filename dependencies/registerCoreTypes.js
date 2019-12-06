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
            registrar.register('any', () => true);
            registrar.register('number', (value) => typeof value === 'number');
            registrar.register('string', (value) => typeof value === 'string');
        }

        return registerTypes;
    }

    registerCoreTypes.dependencies = dependencies;

    return registerCoreTypes;
});