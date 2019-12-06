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
        'registrar'
    ];

    function sglite({
        registrar
    }) {
        function isTypeOf(type) {
            return function (value) {
                return type(value);
            }
        }

        registrar.register('any', () => true);
        registrar.register('number', (value) => typeof value === 'number');
        registrar.register('string', (value) => typeof value === 'string');

        return {
            isTypeOf: isTypeOf,
            types: registrar.types
        };
    }

    sglite.dependencies = dependencies;

    return sglite;
});