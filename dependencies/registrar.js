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

    function registrar({
        registryFactory
    }) {
        let types = {};
        const registry = registryFactory();

        function register(name, definition) {
            registry.register(name, definition);

            Object.defineProperty(types, name, {
                get: () => registry.get(name)
            });
        }

        return {
            register,
            types
        };
    }

    registrar.dependencies = dependencies;

    return registrar;
});