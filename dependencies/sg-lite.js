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
        sglite.dependencies = ['types'];

        function sglite({
            types
        }) {


            function checkTypeOf(type, value) {
                return type(value);
            }

            function isTypeOf(type) {
                return function typeCheck(value) {
                    return checkTypeOf(type, value);
                }
            }

            function checkArity(type, typeName, subtype, subtypeName) {
                if(type.arity !== subtype.length) {
                    const errorMessage = `Cannot register subtype ${subtypeName}.`
                        + ` Type arity must match parent.`
                        + ` ${typeName} has an arity of ${type.arity},`
                        + ` ${subtypeName} has an arity of ${subtype.length}`
                    throw new Error(errorMessage);
                }
            }

            function buildSubtype(parentType, typeFunction) {
                return function (value) {
                    return checkTypeOf(parentType, value)
                        && typeFunction(value);
                }
            }

            function subtype(typeName) {
                const parentType = types[typeName];

                return function (subtypeName, typeFunction) {
                    checkArity(parentType, typeName, typeFunction, subtypeName);

                    types[subtypeName] = buildSubtype(parentType, typeFunction);
                };
            }

            return {
                isTypeOf,
                subtype,
                types
            };
        }

        return sglite;
    })());