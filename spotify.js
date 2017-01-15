'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var config = require('./config');

// credentials are optional
const spotifyApi = new SpotifyWebApi(config);

const scopes = ['user-library-read'];

const state = 'prog-list-user-albums';

const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

const authCodeGrant = function (code) {
    return new Promise(function (resolve, reject) {
        spotifyApi.authorizationCodeGrant(code)
        .then(function (data) {
            console.log(data.body);
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            resolve();
        }, reject);
    });
};

const getMyAlbums = function () {
    return new Promise(function (resolve, reject) {
        spotifyApi.getMySavedAlbums({
            limit: 50,
            offset: 0
        })
        .then(resolve, reject);
    });
};

module.exports = {
    getMyAlbums,
    authorizeURL,
    authCodeGrant,
};
