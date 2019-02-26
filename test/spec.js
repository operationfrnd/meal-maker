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
  // const tablenames = ['Users', 'Recipes', 'Ingredients', 'Saved', 'Dislikes', 'RecipeOfTheDay', 'recipesIngredients'];

    db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
    it('contains a Users table', function (done) {
      const queryString = 'SELECT * FROM Users';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });

    // it('contains id, username, password columns', function (done) {
    //   const newUser = {
    //     username: 'Howard',
    //     password: 'p@ssw0rd',
    //   };
    //   db.query('INSERT INTO Users SET ?', newUser, function (err, results) {
    //     db.query('SELECT * FROM Users WHERE username = ?', newUser.username, function (err, results) {
    //       const user = results[0];
    //       expect(user.username).to.exist;
    //       expect(user.password).to.exist;
    //       expect(user.id).to.exist;
    //       expect(user.salt).to.exist;
    //       done();
    //     });
    //   });
    // });


    it('contains a Recipes table', function (done) {
      const queryString = 'SELECT * FROM Recipes';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
    it('contains a Saved table', function (done) {
      const queryString = 'SELECT * FROM Saved';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
    it('contains a Dislikes table', function (done) {
      const queryString = 'SELECT * FROM Dislikes';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
    it('contains a Ingredient table', function (done) {
      const queryString = 'SELECT * FROM Ingredient';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
    it('contains a RecipeOfTheDay table', function (done) {
      const queryString = 'SELECT * FROM RecipeOfTheDay';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
    it('contains a recipesIngredients table', function (done) {
      const queryString = 'SELECT * FROM recipesIngredients';
      db.query(queryString, (err, results) => {
        if (err) { return done(err); }
        expect(results).to.be.an.instanceof(Array);
        done();
      });
    });
  });


  describe('Account Login:', function () {
    beforeEach(function (done) {
      const options = {
        method: 'POST',
        uri: 'http://127.0.0.1:3001/api/users',
        user: {
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
        uri: 'http://127.0.0.1:3001/api/users/login',
        user: {
          username: 'Samantha',
          password: 'Samantha',
        },
      };

      // request(options, (error, res, body) => {
      //   if (error) { return done(error); }
      //   expect(res.headers.location).to.equal('/');
      //   done();
      // });
    });
  });
});
