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
                it('when called with different values, array check resolves correctly', function () {
                    const checkResultTrue = sglite.isTypeOf(types.array)([]);
                    const checkResultFalse = sglite.isTypeOf(types.array)(null);

                    assert.isTrue(checkResultTrue);
                    assert.isFalse(checkResultFalse);
                });
            });



        });
    });

});