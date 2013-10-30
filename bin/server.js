/*jslint node: true es5:true nomen:true*/

var AtosSIPS = require('../'),
    sips = new AtosSIPS();

var http = require('http');

http.createServer(function (req, res) {
    if (req.url === '/return' && req.method === 'POST') {
        var buffer = '';
        req.on('data', function (chunk) {
            buffer += chunk.toString();
        });
        req.on('end', function () {
            sips.response(buffer.replace('DATA=', ''), function (err, data) {
                console.log(err, data);
            });
        });
    } else if (req.url === '/') {
        sips.request({
            merchant_id: '013044876511112',
            amount: '100',
            customer_id: 'yolo',
            cancel_return_url: 'http://localhost:1337/return',
            normal_return_url: 'http://localhost:1337/return',
            automatic_response_url: 'http://localhost:1337/return'
        }, function (err, data) {
            console.log(err, data);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
}).listen(1337);