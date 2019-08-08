const path = require('path');
const djectContainerFactory = require('dject-core');
const filepathLoader = require('./node-utils/filepath-loader');

function newContainer() {
    const container = djectContainerFactory();
    const dependencyDirectory = path.join(__dirname, 'dependencies');
    const jsFiles = filepathLoader.loadFilePaths(dependencyDirectory);
    
    jsFiles.forEach(function(filePath) {
        const moduleFactory = require(filePath);
    
        container.register(moduleFactory.name, moduleFactory, moduleFactory.dependencies);
    });    
}

module.exports = {
    new: newContainer
};