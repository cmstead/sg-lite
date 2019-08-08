const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core functionality", function(){
   
    let sglite;

    before(function(){
        sglite = sgliteFactory();
    });

    describe('isTypeOf', function() {

        it('returns true when called with any and a value', function () {
            const anyCheckResult = sglite.isTypeOf(sglite.types.any)('This is a string');

            assert.isTrue(anyCheckResult, 'Any check failed to return true');
        });

    });

});