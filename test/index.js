/*jslint node: true es5:true nomen:true*/
/*global describe, it*/

var should = require('should'),
    AtosSIPS = require('../');

describe('AtosSIPS', function () {
    'use strict';
    
    describe('Constructor', function () {
        it('should initialize paths with defaults', function (done) {
            var paths = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config/bin/request',
                    response:  __dirname.replace('test', '') + 'config/bin/response',
                    pathfile:  __dirname.replace('test', '') + 'config/param/pathfile'
                },
                sips = new AtosSIPS();
            
            sips.paths.should.be.eql(paths);

            done();
        });
        
        it('should initialize paths with options', function (done) {
            var paths = {
                    root: '/config',
                    request: '/config/bin/request',
                    response: '/config/bin/response',
                    pathfile: '/config/param/pathfile'
                },
                options = {
                    rootPath: '/config',
                    requestPath: '/config/bin/request',
                    responsePath: '/config/bin/response',
                    pathfilePath: '/config/param/pathfile'
                },
                sips = new AtosSIPS(options);
            
            sips.paths.should.be.eql(paths);

            done();
        });
    });
    
    describe('Request', function () {
    });
});