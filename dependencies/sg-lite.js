(function (moduleFactory) {
    moduleFactory.dependencies = [];

    if (typeof dject !== 'undefined') {
        dject.register(
            moduleFactory,
            moduleFactory.name,
            moduleFactory.dependencies
        );
    } else {
        module.exports = moduleFactory;
    }
})(function sglite () {


    function isTypeOf() {
        return function () {
            return true;
        }
    }

    const types = {
        any: null
    }

    return {
        isTypeOf,
        types
    };
});