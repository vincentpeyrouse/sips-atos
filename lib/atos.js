/*jslint node: true es5:true nomen:true*/

var platform = require('os').platform(),
    exec = require('child_process').exec,
    path = require('path');

function AtosSIPS(options) {
    'use strict';
    
    options = options || {};
    
    this.paths = {};
    
    if (platform === 'linux') {
        this.paths.root = options.rootPath || __dirname + '/../config';
        this.paths.request = options.requestPath || this.paths.root + '/bin/request';
        this.paths.response = options.responsePath || this.paths.root + '/bin/response';
        this.paths.pathfile = options.pathfilePath || this.paths.root + '/param/pathfile';
    } else {
        throw new Error('sips-atos is only compatible with Linux at the moment');
    }
    
    // Some cleaning
    this.paths.root = path.normalize(this.paths.root);
    this.paths.request = path.normalize(this.paths.request);
    this.paths.response = path.normalize(this.paths.response);
    this.paths.pathfile = path.normalize(this.paths.pathfile);
}

AtosSIPS.prototype.request = function (data, callback) {
    'use strict';
    
    if (data === null || callback === undefined) {
        throw new Error('missing arg(s) for request method');
    }
    var requiredArgs = ['merchant_id', 'amount', 'customer_id'];
    
    requiredArgs.forEach(function (requiredArg) {
        if (!data.hasOwnProperty(requiredArg)) {
            throw new Error(requiredArg + ' is required for request method');
        }
    });
    
    // Default parameters if nothing given
    data.merchant_country = data.merchant_country || 'fr';
    data.language = data.language || 'fr';
    data.currency_code = data.currency_code || '978';
    data.pathfile = this.paths.pathfile;
    
    var args = '',
        key = null,
        value = null;
    
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            value = data[key];
            args = args + key + '=' + value + ' ';
        }
    }
    
    exec(this.paths.request + ' ' + args, function (err, stdout, stderr) {
        var result = stdout.split('!');
        
        if (result[1] === undefined) {
            // Binary not found
            return callback('AtosSIPS request binary not found', null);
        }
        if (result[1] !== '0') {
            // Other error
            return callback(result[2].replace(/<\/?[^>]*>/, ''), null);
        }
        callback(null, result[3]);
    });
};

AtosSIPS.prototype.response = function (data, callback) {
    'use strict';
    
    exec(this.paths.response + ' pathfile=' + this.paths.pathfile + 'message=' + data, function (err, stdout, stderr) {
        var result = stdout.split('!');
        
        if (result[1] === undefined) {
            // Binary not found
            return callback('AtosSIPS response binary not found', null);
        }
        if (result[1] !== '0') {
            // Other error
            return callback(result[2].replace(/<\/?[^>]*>/, ''), null);
        }
        console.log(result.length);
        callback(null, result);
    });
};

module.exports = AtosSIPS;