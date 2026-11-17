const test = require('node:test');
const assert = require('node:assert/strict');
const {calculate} = require('../math.js');
test('portrait dimensions', () => assert.deepEqual(calculate(1080,1350),{ratio:'4:5',orientation:'Portrait',pixels:1458000}));
test('landscape dimensions', () => assert.deepEqual(calculate(1920,1080),{ratio:'16:9',orientation:'Landscape',pixels:2073600}));
test('square dimensions', () => assert.deepEqual(calculate(500,500),{ratio:'1:1',orientation:'Square',pixels:250000}));
test('non-standard dimensions', () => assert.equal(calculate(7,3).ratio,'7:3'));
test('invalid dimensions', () => {for(const val of [0,-1,1.5,100001,NaN]) assert.throws(()=>calculate(val,1080),RangeError);});
