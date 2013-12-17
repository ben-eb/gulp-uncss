var es = require('event-stream');
var uncss = require('uncss');

module.exports = function() {
    'use strict';
    var html = arguments[0].html;
    var compress = (arguments[0].compress === false) ? false : true;
    var ignore = arguments[0].ignore;
    var timeout = arguments[0].timeout;
    return es.map(function(file, cb) {
        uncss(html, { raw: String(file.contents), compress: compress, ignore: ignore, timeout: timeout }, function(output) {
            file.contents = new Buffer(output);
            cb(null, file);
        });
    });
};
