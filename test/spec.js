/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const mocha = require('mocha');
const assert = require('assert');
const axios = require('axios');
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { describe } = mocha;

const { expect } = require('chai');
const mysql = require('mysql');

// const httpMocks = require('node-mocks-http');

const { app } = require('../server/index.js');
// const schema = require('../server/db/config.js');
const port = 3001;

describe('', function () {
  let db;
  let server;

  // const clearDB = (connection, tablenames, done) => {
  //   let count = 0;
  //   tablenames.forEach(function (tablename) {
  //     connection.query('DROP TABLE IF EXISTS ' + tablename, function () {
  //       count++;
  //       if (count === tablenames.length) {
  //         return schema(db).then(done);
  //       }
  //     });
  //   });
  // };

  beforeEach(function (done) {
    const tablenames = ['Users', 'Recipes', 'Ingredients', 'Saved', 'Dislikes', 'RecipeOfTheDay', 'recipesIngredients'];

    db = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'mealmaker',
    });

    // db.connect((err) => {
    //   if (err) { return done(err); }
    //   /* Empties the db table before each test so that multiple tests
    //    * (or repeated runs of the tests) won't screw each other up: */
    //   clearDB(db, tablenames, () => {
    //     server = app.listen(port, done);
    //   });
    // });
    server = app.listen(port, done);
    afterEach(function () { server.close(); });
  });

  describe('Database Schema:', function () {
    it('contains a users table', function (done) {
      const queryString = 'SELECT * FROM Users';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }

        expect(results).to.deep.equal([]);
        done();
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


  describe('Account Login:', function () {

    beforeEach(function (done) {
      const options = {
        method: 'POST',
        uri: 'http://127.0.0.1:3001/signup',
        json: {
          username: 'Samantha',
          password: 'Samantha',
        },
      };

      request(options, function (error, res, body) {
        done(error);
      });
    });

    it('Logs in existing users', function (done) {
      const options = {
        method: 'POST',
        uri: 'http://127.0.0.1:3001/login',
        json: {
          username: 'Samantha',
          password: 'Samantha',
        },
      };

      request(options, (error, res, body) => {
        if (error) { return done(error); }
        expect(res.headers.location).to.equal('/');
        done();
      });
    });
  });
});
