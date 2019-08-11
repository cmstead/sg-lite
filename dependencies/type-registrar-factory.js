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
        typeRegistrarFactory.dependencies = [];

        function typeRegistrarFactory({ }) {

            return function (typeRegistry) {
                function checkArity(type, typeName, subtype, subtypeName) {
                    if (type.arity !== subtype.length) {
                        const errorMessage = `Cannot register subtype ${subtypeName}.`
                            + ` Type arity must match parent.`
                            + ` ${typeName} has an arity of ${type.arity},`
                            + ` ${subtypeName} has an arity of ${subtype.length}`
                        throw new Error(errorMessage);
                    }
                }

                function defineType(typeName, typeFunction) {
                    const arity = typeFunction.length;

                    typeRegistry.register(typeName, typeFunction, arity);
                }

                function defineSubtype(
                    parentTypeName,
                    subtypeName,
                    subtypeFunction
                ) {
                    const parentType = typeRegistry.getType(parentTypeName);
                    
                    checkArity(parentType, subtypeName, subtypeFunction, subtypeName);

                    const subtype = buildSubtype(parentType, subtypeFunction);
                    const arity = subtypeFunction.length;

                    typeRegistry.register(subtypeName, subtype, arity);
                }

                function buildSubtype(parentType, typeFunction) {
                    return function (...args) {
                        return parentType.call(null, ...args)
                            && typeFunction.call(null, ...args);
                    }
                }

                function subtype(parentTypename) {
                    return function (subtypeName, typeFunction) {
                        defineSubtype(
                            parentTypename,
                            subtypeName,
                            typeFunction
                        );
                    }
                }

                return {
                    define: defineType,
                    subtype
                };
            };
        }

        return typeRegistrarFactory;
    })());