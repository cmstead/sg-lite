const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core functionality", function () {

    let sglite;
    let types;

    beforeEach(function () {
        sglite = sgliteFactory();
        types = sglite.types;
    });

    describe('isTypeOf', function () {

        it("returns true when a value matches expected type", function(){
            const result = sglite.isTypeOf(types.string)('This is a string');

            assert.isTrue(result);
        });

        it("returns false when a value does not match expected type", function(){
            const result = sglite.isTypeOf(types.string)('This is a string');

            assert.isTrue(result);
        });

    });

});