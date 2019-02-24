/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');
const server = require('../server/index');
const axios = require('axios');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Server', () => {
  it("server should default to port 3001 if PORT isn't already set", () => {
    assert.deepEqual(server.port, 3001);
  });
  describe('Endpoints', () => {
    describe('/food', () => {
      it('should give back an array of objects', () => {
        axios({
          method: 'get',
          url: 'https://localhost:3001/food',
          params: {
            ingredients: 'beef, brocolli',
          },
        }).then((result) => {
          return assert.deepEqual(Array.isArray(result.data), false);
        }).catch((err) => {
          console.log(err);
          return Error('STOP THIS MADNESS');
        });
      });
    });
  });
});
