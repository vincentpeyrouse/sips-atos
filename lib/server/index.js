/*jslint node: true es5:true*/
'use strict';

module.exports = function (app) {

    require('./environment')(app);
    
    require('./routes')(app);

};