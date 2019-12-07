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
            registrar.register('undefined', checkTypeOf('undefined'));
            registrar.register('boolean', checkTypeOf('boolean'));
            registrar.register('bigint', checkTypeOf('bigint'));
            registrar.register('symbol', checkTypeOf('symbol'));

            registrar.register('null', (value) => value === null);

            function eachMatches(values, typeCheck) {
                for (let i = 0; i < values.length; i++) {
                    if (typeCheck(values[i]) === false) {
                        return false;
                    }
                }

                return true;
            }

            function isArrayOf(value, [ type ]) {
                return Array.isArray(value)
                    && eachMatches(value, type);
            }
            
            registrar.register('array', isArrayOf, ['memberType']);
        }

        return registerTypes;
    }

    registerCoreTypes.dependencies = dependencies;

    return registerCoreTypes;
});