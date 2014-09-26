/* jshint node:true */

'use strict';

var uncss           = require('uncss'),
    gutil           = require('gulp-util'),
    transform       = require('stream').Transform,
    objectAssign    = require('object-assign'),

    PLUGIN_NAME     = 'gulp-uncss';

module.exports = function() {
    var stream = new transform({ objectMode: true });
    var options = {
        html: arguments[0].html,
        ignore: arguments[0].ignore,
        timeout: arguments[0].timeout,
        ignoreSheets: [/\s*/]
    };

    stream._transform = function(file, unused, done) {
        if (file.isStream()) {
            return done(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        } else if (file.isBuffer()) {
            uncss(options.html, objectAssign(options, { raw: String(file.contents) }), function(err, output) {
                if (err) {
                    return done(new gutil.PluginError(PLUGIN_NAME, err));
                }
                file.contents = new Buffer(output);
                done(null, file);
            });
        } else {
            // Pass through when null
            done(null, file);
        }
    };

    return stream;
}
