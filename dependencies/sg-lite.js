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
        sglite.dependencies = [
            'coreTypeBuilder',
            'typeRegistryFactory',
            'typeRegistrarFactory'
        ];

        function sglite({
            coreTypeBuilder,
            typeRegistryFactory,
            typeRegistrarFactory
        }) {

            console.log(typeRegistryFactory);

            const typeRegistry = typeRegistryFactory();
            const typeRegistrar = typeRegistrarFactory(typeRegistry);

            coreTypeBuilder.buildCoreTypes(typeRegistrar);

            function checkTypeOf(type, value) {
                return type(value);
            }

            function isTypeOf(type) {
                return function typeCheck(value) {
                    return checkTypeOf(type, value);
                }
            }

            function subtype(parentTypename) {
                return function (subtypeName, typeFunction) {
                    typeRegistrar.defineSubtype(
                        parentTypename,
                        subtypeName,
                        typeFunction
                    );
                }
            }

            return {
                isTypeOf,
                subtype,
                types: typeRegistry.getTypeObject()
            };
        }

        return sglite;
    })());