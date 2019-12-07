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

        function buildSimpleType(typeString, definition) {
            function typeDef(value) {
                return definition(value);
            }

            typeDef.typeString = typeString;

            return typeDef;
        }

        function buildParameterizedType(name, definition, parameters) {
            const parameterList = parameters.join(', ');
            const typeString = `${name}<${parameterList}>`;

            function typeDef(...args) {
                if(args.length !== parameters.length) {
                    const message = `Type '${name}' expects arguments '${parameterList}'`;
                    throw new Error(message);
                }

                const argString = args
                    .map(value => value.typeString)
                    .join(', ');
                const typeString = `${name}<${argString}>`;
                const typeDefinition = definition(...args);

                return buildType(typeString, typeDefinition);
            }

            typeDef.typeString = typeString;

            return typeDef;
        }

        function buildType(name, definition, parameters) {

            if(!Array.isArray(parameters) || parameters.length === 0) {
                return buildSimpleType(name, definition);
            } else {
                return buildParameterizedType(name, definition, parameters);
            }

        }

        function register(name, definition, parameters) {
            const typeDef = buildType(name, definition, parameters);

            registry.register(name, typeDef);

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