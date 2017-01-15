'use strict';

const express = require('express');
const app = express();
const serveStatic = require('serve-static');
require('ejs');

const spotify = require('./spotify');

// app.use('/static', express.static(__dirname + 'static'));
app.use(serveStatic('static'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/callback', function (req, res) {
    spotify.authCodeGrant(req.query.code).then(function () {
        setTimeout(function () {
            res.redirect('/');
        }, 2000);
    }).catch(function () {
        res.send('Something went wrong...');
    });
});

app.get('/albums', function (req, res) {
    spotify.getMyAlbums().then(function (response) {
        res.json(response.body);
    }).catch(function () {
        res.json({ error: 'Unauthorized', authUrl: spotify.authorizeURL });
    });
});

app.get('/auth', function (req, res) {
    // spotify.getMyAlbums().then(function (response) {
    //     res.json(response.body);
    // }).catch(function () {
    //     console.log(this, arguments);
    // });
    const html = `
        <a href="${spotify.authorizeURL}">Auth Spotify account</a>;
    `;
    res.send(html);
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
