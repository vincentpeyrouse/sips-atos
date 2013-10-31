/*jslint node: true es5:true*/
'use strict';

var express = require('express');

module.exports = function (app) {

    app.configure('development', function () {
        app.use(express.logger('dev'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

};