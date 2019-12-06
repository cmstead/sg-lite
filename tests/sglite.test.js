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

        it('when called with different values, number check resolves correctly', function () {
            const numberCheckResultTrue = sglite.isTypeOf(types.number)(1234);
            const numberCheckResultFalse = sglite.isTypeOf(types.number)('not a number');

            assert.isTrue(numberCheckResultTrue);
            assert.isFalse(numberCheckResultFalse);
        });

        it('when called with different values, string check resolves correctly', function () {
            const stringCheckResultTrue = sglite.isTypeOf(types.string)('I am a string');
            const stringCheckResultFalse = sglite.isTypeOf(types.string)(null);

            assert.isTrue(stringCheckResultTrue);
            assert.isFalse(stringCheckResultFalse);
        });

        it('when called with different values, object check resolves correctly', function () {
            const stringCheckResultTrue = sglite.isTypeOf(types.object)({});
            const stringCheckResultFalse = sglite.isTypeOf(types.object)(undefined);

            assert.isTrue(stringCheckResultTrue);
            assert.isFalse(stringCheckResultFalse);
        });

        it('when called with different values, null check resolves correctly', function () {
            const stringCheckResultTrue = sglite.isTypeOf(types.null)(null);
            const stringCheckResultFalse = sglite.isTypeOf(types.null)(undefined);

            assert.isTrue(stringCheckResultTrue);
            assert.isFalse(stringCheckResultFalse);
        });

        it('when called with different values, undefined check resolves correctly', function () {
            const checkResultTrue = sglite.isTypeOf(types.undefined)(undefined);
            const checkResultFalse = sglite.isTypeOf(types.undefined)(null);

            assert.isTrue(checkResultTrue);
            assert.isFalse(checkResultFalse);
        });

        it('when called with different values, array check resolves correctly', function () {
            const checkResultTrue = sglite.isTypeOf(types.array)([]);
            const checkResultFalse = sglite.isTypeOf(types.array)(null);

            assert.isTrue(checkResultTrue);
            assert.isFalse(checkResultFalse);
        });

        it('when called with different values, boolean check resolves correctly', function () {
            const checkResultTrue = sglite.isTypeOf(types.boolean)(true);
            const checkResultFalse = sglite.isTypeOf(types.boolean)(null);

            assert.isTrue(checkResultTrue);
            assert.isFalse(checkResultFalse);
        });

        it('when called with different values, bigint check resolves correctly', function () {
            const checkResultTrue = sglite.isTypeOf(types.bigint)(53n);
            const checkResultFalse = sglite.isTypeOf(types.bigint)(null);

            assert.isTrue(checkResultTrue);
            assert.isFalse(checkResultFalse);
        });

        it('when called with different values, symbol check resolves correctly', function () {
            const checkResultTrue = sglite.isTypeOf(types.symbol)(Symbol('HI'));
            const checkResultFalse = sglite.isTypeOf(types.symbol)(null);

            assert.isTrue(checkResultTrue);
            assert.isFalse(checkResultFalse);
        });

    });

});