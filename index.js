const container = require('./container');

function sgliteFactory() {
    return container
        .buildWithObject('sglite');
}

module.exports = sgliteFactory;