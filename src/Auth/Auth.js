// src/Auth/Auth.js

const auth0 = require('auth0-js');
console.log(auth0);
module.exports.Auth = class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'dev-rp143ga1.auth0.com',
    clientID: 'ODa7fMDlH4CHx2aK16yhRg1Dl8b8VJGk',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });



  login() {
    this.auth0.authorize();
  }
}