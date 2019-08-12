(function (moduleFactory) {
    if (typeof dject !== 'undefined') {
        dject.register(moduleFactory);
    } else {
        module.exports = moduleFactory;
    }
})(
    (function () {
        typeRegistrarFactory.dependencies = [];

        function typeRegistrarFactory({ }) {

            return function (typeRegistry) {
                function buildErrorMessage(type, typeName, subtype, subtypeName) {
                    return `Cannot register subtype ${subtypeName}.`
                        + ` Type arity must match parent.`
                        + ` ${typeName} has an arity of ${type.arity},`
                        + ` ${subtypeName} has an arity of ${subtype.length}`;
                }

                function checkArity(type, typeName, subtype, subtypeName) {
                    if (type.arity !== subtype.length) {
                        const errorMessage = buildErrorMessage(type, typeName, subtype, subtypeName);

                        throw new Error(errorMessage);
                    }
                }

                function wrapType(typeFunction) {
                    if (typeFunction.length > 1) {
                        function wrappedType(...args) {
                            return (value) => typeFunction(value, ...args);
                        }

                        wrappedType.arity = typeFunction.length;

                        return wrappedType;
                    } else {
                        return typeFunction;
                    }
                }

                function defineType(typeName, typeFunction) {
                    const arity = typeFunction.length;

                    typeRegistry.register(typeName, wrapType(typeFunction), arity);
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