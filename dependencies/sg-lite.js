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
            'typeRegistrarFactory',
            'typeUtilities'
        ];

        function sglite({
            coreTypeBuilder,
            typeRegistryFactory,
            typeRegistrarFactory,
            typeUtilities
        }) {

            console.log(typeRegistryFactory);

            const typeRegistry = typeRegistryFactory();
            const typeRegistrar = typeRegistrarFactory(typeRegistry);

            coreTypeBuilder.buildCoreTypes(typeRegistrar);

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
                isTypeOf: typeUtilities.isTypeOf,
                subtype,
                types: typeRegistry.getTypeObject()
            };
        }

        return sglite;
    })());