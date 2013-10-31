/*jslint node: true es5:true*/
'use strict';

var express = require('express');

module.exports = function (app) {

    app.configure('production', function () {
        app.enable('view cache');
        app.use(express.logger());
        app.use(express.errorHandler());
    });

};