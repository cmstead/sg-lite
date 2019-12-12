const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core types", function () {

    let sglite;
    let types;

    beforeEach(function () {
        sglite = sgliteFactory();
        types = sglite.types;
    });

    describe("Simple types", function () {
        const typeExpectations = [
            {
                name: 'number',
                pass: 1234,
                fail: null
            },
            {
                name: 'string',
                pass: '1234',
                fail: null
            },
            {
                name: 'object',
                pass: {},
                fail: undefined
            },
            {
                name: 'null',
                pass: null,
                fail: undefined
            },
            {
                name: 'undefined',
                pass: undefined,
                fail: 'this is a string'
            },
            {
                name: 'boolean',
                pass: true,
                fail: undefined
            },
            {
                name: 'bigint',
                pass: 53n,
                fail: undefined
            },
            {
                name: 'symbol',
                pass: Symbol(() => 'test'),
                fail: undefined
            },
        ];

        typeExpectations.forEach(function ({ name, pass, fail }) {
            it(`when called with different values, ${name} check resolves correctly`, function () {
                const numberCheckResultTrue = sglite.isTypeOf(types[name])(pass);
                const numberCheckResultFalse = sglite.isTypeOf(types[name])(fail);

                assert.isTrue(numberCheckResultTrue);
                assert.isFalse(numberCheckResultFalse);
            });
        });

        it('returns true when called with any and a value', function () {
            const anyCheckResult = sglite.isTypeOf(types.any)('This is a string');

            assert.isTrue(anyCheckResult, 'Any check failed to return true');
        });
    });

    describe("Parameterized Types", function () {

        describe("Array", function () {

            let arrayOf, any, sglite, types;

            beforeEach(function () {
                sglite = sgliteFactory();
                types = sglite.types;

                arrayOf = types.array;
            });

            it('when called with empty array, array(any) returns true', function () {
                const checkResultTrue = sglite.isTypeOf(arrayOf(types.any))([]);

                assert.isTrue(checkResultTrue);
            });

            it('when called with a non-array, array(any) returns false', function () {
                const checkResultTrue = sglite.isTypeOf(arrayOf(types.any))(null);

                assert.isFalse(checkResultTrue);
            });

            it('when called with an array containing a non-number, array(number) returns false', function () {
                const checkResultTrue = sglite.isTypeOf(arrayOf(types.number))(null);

                assert.isFalse(checkResultTrue);
            });

            it('throws an error when a type is not provided', function () {
                assert.throws(() => arrayOf(), `Type 'array' expects arguments 'memberType'`)
            });

            it('has an attached type string as constructed by type calls', function () {
                const finalType = arrayOf(arrayOf(types.number));

                assert.equal(finalType.typeString, 'array<array<number>>');
            });
        });



    });

});