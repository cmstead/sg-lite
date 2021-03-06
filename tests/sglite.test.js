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

        it("returns true when a value matches expected type", function () {
            const result = sglite.isTypeOf(types.string)('This is a string');

            assert.isTrue(result);
        });

        it("returns false when a value does not match expected type", function () {
            const result = sglite.isTypeOf(types.string)('This is a string');

            assert.isTrue(result);
        });

    });

    describe("verify", function () {

        it("passes value through when it matches expected type", function () {
            const initialValue = 'This is correct';

            const resultingValue = sglite.verify(types.string)(initialValue);

            assert.equal(resultingValue, initialValue);
        });

        it("throws an error when value does not match expected type", function () {
            const initialValue = 'This is wrong';

            const testBehavior = () => sglite.verify(types.number)(initialValue);

            assert.throws(testBehavior, `Expected a value of type 'number', but got 'This is wrong' of type 'string'.`);
        });

    });

    describe("sign", function(){
       
        it("signs a function with a given contract", function(){
            const contract = [
                [
                    ['a', types.string], 
                    ['b', types.string]
                ],
                [types.string]
            ];

            const signedFunction = sglite.sign(
                contract,
                (a, b) =>  a + b
            );

            assert.equal(signedFunction.signature, 'a: string, b: string => string');
        });
        
        it("preserves function name in signing", function(){
            const contract = [
                [types.string, types.string],
                [types.string]
            ];

            const signedFunction = sglite.sign(
                contract,
                function concatenate(a, b) { return a + b; }
            );

            assert.equal(signedFunction.name, 'concatenate');
        });

    });
});