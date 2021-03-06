/*jslint node: true es5:true*/
'use strict';

var path = require('path'),
    AtosSIPS = require('../atos'),
    sips = new AtosSIPS({
        rootPath: path.join(__dirname, 'config')
    });

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        sips.request({
            merchant_id: '011223344551111', // Demo merchant id
            amount: '100',
            customer_id: '1',
            cancel_return_url: 'http://127.0.0.1:1337/return',
            normal_return_url: 'http://127.0.0.1:1337/return',
            automatic_response_url: 'http://127.0.0.1:1337/return'
        }, function (err, data) {
            if (err) {
                return next(new Error(err));
            }
            res.render('form', { data: data });
        });
    });
    
    app.post('/return', function (req, res, next) {
        sips.response(req.body.DATA, function (err, data) {
            if (err) {
                return next(new Error(err));
            }
            res.render('result', { data: data });
        });
    });
};