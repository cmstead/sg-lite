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
        function checkType(expectedType, value) {
            return expectedType(value);
        }

        function isTypeOf(expectedType) {
            return function (value) {
                return checkType(expectedType, value);
            }
        }

        function buildTypeError(expectedType, value) {
            return `Expected a value of type ` +
                `'${expectedType.typeString}', ` +
                `but got '${value.toString()}' ` +
                `of type '${typeof value}'.`;
        }

        function verifyValue(expectedType, value) {
            if (checkType(expectedType, value)) {
                return value;
            } else {
                const errorMessage = buildTypeError(expectedType, value);
                throw new Error(errorMessage);
            }
        }

        function verify(expectedType) {
            return function (value) {
                return verifyValue(expectedType, value)
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