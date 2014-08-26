/*jslint node: true es5:true nomen:true*/

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

/**
 * Server setup.
 */
require('../lib/server')(app);

http.createServer(app).listen(app.get('port'), function () {
    'use strict';
    
    console.log('AtosSIPS server started on port ' + app.get('port'));
});