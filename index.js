const containerFactory = require('./container');

function sgliteFactory() {
    return containerFactory
        .new()
        .buildWithObject('sglite');
}

module.exports = sgliteFactory;