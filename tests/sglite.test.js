const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core functionality", function(){
   
    let sglite;
    let types;

    beforeEach(function(){
        sglite = sgliteFactory();
        types = sglite.types;
    });

    describe('isTypeOf', function() {

        it('returns true when called with any and a value', function () {
            const anyCheckResult = sglite.isTypeOf(types.any)('This is a string');

            assert.isTrue(anyCheckResult, 'Any check failed to return true');
        });

        it('returns false when called with number and a value which is not a number', function () {
            const numberCheckResult = sglite.isTypeOf(types.number)('not a number');

            assert.isFalse(numberCheckResult, 'Number check passed when it should have failed');
        });

        it('returns false when called with string and a value which is not a string', function () {
            const stringCheckResult = sglite.isTypeOf(types.string)(null);

            assert.isFalse(stringCheckResult, 'String check passed when it should have failed');
        });

    });

});