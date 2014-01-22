/* jshint node:true */

'use strict';

var map = require('map-stream');
var uncss = require('uncss');

module.exports = function() {
    var html = arguments[0].html;
    var ignore = arguments[0].ignore;
    var timeout = arguments[0].timeout;
    return map(function(file, cb) {
        uncss(html, { raw: String(file.contents), ignore: ignore, timeout: timeout }, function(err, output) {
            if (err) {
                cb('gulp-uncss: ' + err);
            }
            file.contents = new Buffer(output);
            cb(null, file);
        });
    });
};
