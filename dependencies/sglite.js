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

        function buildTypeError(expectedType, value) {
            return `Expected a value of type ` +
                `'${expectedType.typeString}', ` +
                `but got '${value.toString()}' ` +
                `of type '${typeof value}'.`;
        }

        function throwOnBadValueType(expectedType, value) {
            if (!checkType(expectedType, value)) {
                const errorMessage = buildTypeError(expectedType, value);
                throw new Error(errorMessage);
            }
        }

        function verifyValue(expectedType, value) {
            throwOnBadValueType(expectedType, value)
            return value;
        }

        const isTypeOf = (expectedType) =>
            (value) =>
                checkType(expectedType, value)

        const verify = (expectedType) =>
            (value) =>
                verifyValue(expectedType, value)

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