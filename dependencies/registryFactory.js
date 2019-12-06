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

    function registryFactory({ }) {
        return function () {
            let registeredTypes = {};
            let api = {};
    
            function register(name, definition) {
                if (typeof registeredTypes[name] !== 'undefined') {
                    throw new Error(`Cannot reregister type '${name}'`);
                }
    
                registeredTypes[name] = definition;
                return api;
            }
    
            function getType(name) {
                return registeredTypes[name];
            }

            api.register = register;
            api.get = getType
    
            return api;
        }
    }

    registryFactory.dependencies = dependencies;

    return registryFactory;
});