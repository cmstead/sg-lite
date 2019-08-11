const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core functionality", function(){
   
    let sglite;
    let types;

    before(function(){
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

    });

    describe('subtype', function () {
        it('defines a new type as a subtype of another', function () {
            sglite.subtype('number')('positiveNumber', function(value) {
                return !(value < 0);
            });

            const valueTest = sglite.isTypeOf(types.positiveNumber)(1);
            assert.isTrue(valueTest, 'Value was not properly verified against positiveNumber');
        });

        it('requires value adheres to parent type', function () {
            sglite.subtype('string')('nonemptyString', function (value) {
                return value.length > 0;
            });

            const valueTest = sglite.isTypeOf(types.nonemptyString)(null);
            assert.isFalse(valueTest, 'Value was not properly checked to be a string or nonemptyString');
        });

        it('throws an error if type function arity does not match parent arity', function () {
            const defineSubtype = () =>
                sglite.subtype('string')('badStringChild', function (one, two) {});
            
            assert.throws(defineSubtype, '', 'Arity check failed to throw');
        });
    });

});