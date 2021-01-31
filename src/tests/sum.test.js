const TestRenderer = require('react-test-renderer');

const sum = require('./sum');

//exact equality
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

//check the value of an object
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

//test for the opposite of a matcher
test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

//