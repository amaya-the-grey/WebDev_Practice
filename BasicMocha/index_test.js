// run via $npm test
const assert = require('assert');
const Rooster = require('../index');

describe('Rooster', () => {
  describe('.announceDawn', () => {
    it('returns a rooster call', () => {
      // Define expected output
      const expected = 'cock-a-doodle-doo!';

      // Call Rooster.announceDawn and store result in variable
      const result = Rooster.announceDawn();

      // Use an assert method to compare actual and expected result
      assert.deepEqual(expected, result);

    });
  });
});
