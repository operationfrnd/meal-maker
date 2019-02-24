/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const mocha = require('mocha');
const assert = require('assert');
const axios = require('axios');
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');

const describe = mocha.describe;

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Server', () => {
  describe('Endpoints', () => {
    describe('/food', () => {
      it('should give back an array of objects', () => {
        axios.get('https://localhost:3001/').then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      });
    });
  });
});
