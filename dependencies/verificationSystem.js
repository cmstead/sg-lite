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

    function verificationSystem({ }) {
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
                checkType(expectedType, value);

        const verify = (expectedType) =>
            (value) =>
                verifyValue(expectedType, value);

        function buildTypeString(typeDeclaration) {
            if (typeof typeDeclaration === 'function') {
                return typeDeclaration.typeString;
            } else {
                return typeDeclaration[0] + ': ' + typeDeclaration[1].typeString;
            }
        }

        function buildSignatureExpression(contractLine) {
            return contractLine
                .map(buildTypeString)
                .join(', ');
        }

        function attachSignature(contract, fn) {
            const signature = contract
                .map(buildSignatureExpression)
                .join(' => ');

            return Object.defineProperty(fn, 'signature', {
                value: signature
            });

        }

        function sign(contract, fn) {
            const output = {
                [fn.name]: (...args) => fn(...args)
            };

            return attachSignature(contract, output[fn.name]);
        }

        return {
            isTypeOf,
            sign,
            verify
        };
    }

    verificationSystem.dependencies = dependencies;

    return verificationSystem;
});