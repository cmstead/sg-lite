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

        it('returns false when called with object and a value which is not an object', function () {
            const stringCheckResult = sglite.isTypeOf(types.object)(undefined);

            assert.isFalse(stringCheckResult, 'Object check passed when it should have failed');
        });

        it('returns false when called with null and a value which is not null', function () {
            const stringCheckResult = sglite.isTypeOf(types.null)(undefined);

            assert.isFalse(stringCheckResult, 'Null check passed when it should have failed');
        });

        it('returns false when called with null and a value which is not null', function () {
            const stringCheckResult = sglite.isTypeOf(types.null)(undefined);

            assert.isFalse(stringCheckResult, 'Null check passed when it should have failed');
        });

        it('returns false when called with undefined and a value which is not undefined', function () {
            const stringCheckResult = sglite.isTypeOf(types.undefined)(null);

            assert.isFalse(stringCheckResult, 'Undefined check passed when it should have failed');
        });

    });

});