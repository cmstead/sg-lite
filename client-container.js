(function () {
    const dject = djectContainerFactory();
    const register = dject.register;

    function decoratedRegister(moduleFactory) {
        register(
            moduleFactory.name,
            moduleFactory,
            moduleFactory.dependencies
        );
    }

    dject.register = decoratedRegister;

    window.dject = dject;
})();