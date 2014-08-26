/*jslint node: true es5:true nomen:true*/
/*global describe, it*/

var should = require('should'),
    platform = require('os').platform(),
    AtosSIPS = require('../');

describe('AtosSIPS', function () {
    'use strict';
    
    describe('Constructor', function () {
        it('should initialize paths with defaults', function (done) {
            
            var paths;
            
            if (platform === 'linux') {
                paths = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config/bin/request',
                    response:  __dirname.replace('test', '') + 'config/bin/response',
                    pathfile:  __dirname.replace('test', '') + 'config/param/pathfile'
                };
            } else if (platform === 'win32') {
                paths = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config\\bin\\request.exe',
                    response:  __dirname.replace('test', '') + 'config\\bin\\response.exe',
                    pathfile:  __dirname.replace('test', '') + 'config\\param\\pathfile'
                };
            } else {
                throw new Error('sips-atos is only compatible with Linux and Windows at the moment');
            }
            
            var sips = new AtosSIPS();
            
            sips.paths.should.be.eql(paths);

            done();
        });
        
        it('should initialize paths with options', function (done) {
            var paths, options;
            
            if (platform === 'linux') {
                paths = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config/bin/request',
                    response:  __dirname.replace('test', '') + 'config/bin/response',
                    pathfile:  __dirname.replace('test', '') + 'config/param/pathfile'
                };
                options = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config/bin/request',
                    response:  __dirname.replace('test', '') + 'config/bin/response',
                    pathfile:  __dirname.replace('test', '') + 'config/param/pathfile'
                };
            } else if (platform === 'win32') {
                paths = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config\\bin\\request.exe',
                    response:  __dirname.replace('test', '') + 'config\\bin\\response.exe',
                    pathfile:  __dirname.replace('test', '') + 'config\\param\\pathfile'
                };
                options = {
                    root: __dirname.replace('test', '') + 'config',
                    request:  __dirname.replace('test', '') + 'config\\bin\\request.exe',
                    response:  __dirname.replace('test', '') + 'config\\bin\\response.exe',
                    pathfile:  __dirname.replace('test', '') + 'config\\param\\pathfile'
                };
            } else {
                throw new Error('sips-atos is only compatible with Linux and Windows at the moment');
            }

            var sips = new AtosSIPS(options);
            
            sips.paths.should.be.eql(paths);

            done();
        });
    });
    
    describe('Request', function () {
    });
});