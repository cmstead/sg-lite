const fs = require('fs');
const container = require('dject-core')();

const fileNames = fs
    .readdirSync('./dependencies')
    .filter(fileName => !/^\.+$/.test(fileName));

const modules = fileNames
    .map(fileName =>
        require(`./dependencies/${fileName}`));

modules
    .filter(moduleValue => typeof moduleValue === 'function')
    .map(moduleValue => 
        container.register(
            moduleValue.name, 
            moduleValue,
            moduleValue.dependencies
        ));

module.exports = container;