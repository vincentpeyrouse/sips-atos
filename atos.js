/*jslint node: true es5:true nomen:true*/

var platform = require('os').platform(),
    exec = require('child_process').exec,
    path = require('path');

function AtosSIPS(options) {
    'use strict';

    options = options || {};

    this.paths = {};

    this.paths.root = options.rootPath || path.join(__dirname, 'config');
    if (platform === 'linux') {
        this.paths.request = options.requestPath || path.join(this.paths.root, 'bin', 'request');
        this.paths.response = options.responsePath || path.join(this.paths.root, 'bin', 'response');
        this.paths.pathfile = options.pathfilePath || path.join(this.paths.root, 'param', 'pathfile');
    } else if (platform === 'win32') {
        this.paths.request = options.requestPath || path.join(this.paths.root, 'bin', 'request.exe');
        this.paths.response = options.responsePath || path.join(this.paths.root, 'bin', 'response.exe');
        this.paths.pathfile = options.pathfilePath || path.join(this.paths.root, 'param', 'pathfile');
    } else {
        throw new Error('sips-atos is only compatible with Linux and Windows at the moment');
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
    var requiredArgs = ['merchant_id', 'amount', 'customer_id', 'cancel_return_url', 'normal_return_url', 'automatic_response_url'];

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
            args = args + key + '="' + value + '" ';
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

function parseResult(result) {
    'use strict';

    return {
        code: result[1],
        error: result[2],
        merchant_id: result[3],
        merchant_country: result[4],
        amount: result[5],
        transaction_id: result[6],
        payment_means: result[7],
        transmission_date: result[8],
        payment_time: result[9],
        payment_date: result[10],
        response_code: result[11],
        payment_certificate: result[12],
        authorisation_id: result[13],
        currency_code: result[14],
        card_number: result[15],
        cvv_flag: result[16],
        cvv_response_code: result[17],
        bank_response_code: result[18],
        complementary_code: result[19],
        complementary_info: result[20],
        return_context: result[21],
        caddie: result[22],
        receipt_complement: result[23],
        merchant_language: result[24],
        language: result[25],
        customer_id: result[26],
        order_id: result[27],
        customer_email: result[28],
        customer_ip_address: result[29],
        capture_day: result[30],
        capture_mode: result[31],
        data: result[32]
    };
}

AtosSIPS.prototype.response = function (data, callback) {
    'use strict';

    exec(this.paths.response + ' pathfile=' + this.paths.pathfile + ' message=' + data, function (err, stdout, stderr) {
        var result = parseResult(stdout.split('!'));
        if (result.code === undefined) {
            // Binary not found
            return callback('AtosSIPS response binary not found', result);
        }
        if (result.code !== '0') {
            // Other error
            return callback(result.error.replace(/<\/?[^>]*>/, ''), result);
        }
        callback(null, result);
    });
};

module.exports = AtosSIPS;
