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
        'registryFactory'
    ];

    function sglite({
        registryFactory
    }) {
        let types = {};
        
        const registry = registryFactory();

        registry.register('any', () => true);
        registry.register('number', (value) => {
            return typeof value === 'number';
        });

        Object.defineProperties(types, {
            any: { get: () => registry.get('any') },
            number: { get: () => registry.get('number') }
        });

        function isTypeOf(type) {
            return function (value) {
                return type(value);
            }
        }

        return {
            isTypeOf: isTypeOf,
            types: types
        };
    }

    sglite.dependencies = dependencies;

    return sglite;
});