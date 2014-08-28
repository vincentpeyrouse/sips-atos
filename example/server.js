/*jslint node: true es5:true nomen:true*/

var express = require('express'),
    http = require('http'),
    connect = require('connect'),
    path = require('path');

var app = express();

/**
 * Server setup.
 */
app.configure(function () {
        
    app.set('port', process.env.PORT || 1337);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.set('layout', 'layout');
    app.use(express.favicon());
    app.use(express.static(path.join(__dirname, 'config', 'logo')));
    app.use(connect.json());
    app.use(connect.urlencoded());
    app.use(express.methodOverride());

    app.use(app.router);

    app.use(function (req, res, next) {
        res.status(404);
        res.render('errors/404', { url: req.url });
    });

    // error-handling middleware
    app.use(function (err, req, res, next) {
        // we may use properties of the error object
        // here and next(err) appropriately, or if
        // we possibly recovered from the error, simply next().
        res.status(err.status || 500);
        res.render('errors/500', { error: err });
    });

});

app.configure('development', function () {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.enable('view cache');
    app.use(express.logger());
    app.use(express.errorHandler());
});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function () {
    'use strict';
    
    console.log('AtosSIPS example started on port ' + app.get('port'));
});