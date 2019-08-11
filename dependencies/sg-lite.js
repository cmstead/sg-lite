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

            const typeRegistry = typeRegistryFactory();
            const typeRegistrar = typeRegistrarFactory(typeRegistry);

            coreTypeBuilder.buildCoreTypes(typeRegistrar);

            return {
                isTypeOf: typeUtilities.isTypeOf,
                subtype: typeRegistrar.subtype,
                types: typeRegistry.getTypeObject()
            };
        }

        return sglite;
    })());