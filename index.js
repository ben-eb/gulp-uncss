'use strict';

var uncss       = require('uncss'),
    gutil       = require('gulp-util'),
    assign      = require('object-assign'),
    transform   = require('stream').Transform,

    PLUGIN_NAME = 'gulp-uncss';

module.exports = function(options) {
    var stream = new transform({ objectMode: true });

    // Ignore stylesheets in the HTML files; only use those from the stream
    options.ignoreSheets = [/\s*/];

    stream._transform = function(file, unused, done) {
        if (file.isStream()) {
            var error = 'Streaming not supported';
            return done(new gutil.PluginError(PLUGIN_NAME, error));
        } else if (file.isBuffer()) {
            options = assign(options, { raw: String(file.contents) });
            uncss(options.html, options, function(err, output) {
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
};
