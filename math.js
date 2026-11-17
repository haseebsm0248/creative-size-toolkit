/* Pure utility functions shared by the browser app and tests. */
(function (root, factory) {
  const toolkit = factory();
  if (typeof module === 'object' && module.exports) module.exports = toolkit;
  else root.SizeMath = toolkit;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
  function valid(n) { return Number.isSafeInteger(n) && n >= 1 && n <= 100000; }
  function calculate(width, height) {
    if (!valid(width) || !valid(height)) throw new RangeError('Enter whole numbers from 1 to 100,000.');
    const factor = gcd(width, height);
    return { ratio: `${width / factor}:${height / factor}`, orientation: width > height ? 'Landscape' : width < height ? 'Portrait' : 'Square', pixels: width * height };
  }
  return { calculate };
});
