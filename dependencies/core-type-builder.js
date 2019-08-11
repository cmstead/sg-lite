(function (moduleFactory) {
    if (typeof dject !== 'undefined') {
        dject.register(
            moduleFactory,
            moduleFactory.name,
            moduleFactory.dependencies
        );
    } else {
        module.exports = moduleFactory;
    }
})(
    (function () {
        coreTypeBuilder.dependencies = [];

        function coreTypeBuilder({ }) {

            function any(value) {
                return true;
            }

            function defineTypeByName(typeName) {
                return function (value) {
                    return typeof value === typeName;
                }
            }

            function defineCoreTypes(typeRegistrar) {
                return function defineCoreTypeByName(typeName) {
                    typeRegistrar.subtype('any')
                    (
                        typeName,
                        defineTypeByName(typeName)
                    );
                }
            }

            function buildCoreTypes(typeRegistrar) {
                const defineCoreTypeByName = defineCoreTypes(typeRegistrar);

                typeRegistrar.define('any', any);

                defineCoreTypeByName('number');
                defineCoreTypeByName('string');
            }

            return {
                buildCoreTypes
            };
        }

        return coreTypeBuilder;
    })());