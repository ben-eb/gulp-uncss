/* jshint node:true */

'use strict';

var uncss           = require('uncss'),
    gutil           = require('gulp-util'),
    transform       = require('stream').Transform,
    bufferstreams   = require('bufferstreams'),
    objectAssign    = require('object-assign'),

    PLUGIN_NAME     = 'gulp-uncss';

function uncssTransform(options) {
    // Returns a callback that handles the buffered content
    return function(err, buffer, cb) {
        if (err) {
            cb(new gutil.PluginError(PLUGIN_NAME, err));
        }
        uncss(options.html, objectAssign(options, { raw: String(buffer) }), function(err, output) {
            if (err) {
                cb(new gutil.PluginError(PLUGIN_NAME, err));
            }
            cb(null, new Buffer(output));
        });
    };
}

function gulpuncss() {
    var stream = new transform({ objectMode: true });
    var options = {
        html: arguments[0].html,
        ignore: arguments[0].ignore,
        timeout: arguments[0].timeout,
        ignoreSheets: [/\s*/]
    };
    stream._transform = function(file, unused, done) {
        // Pass through if null
        if (file.isNull()) {
            stream.push(file);
            done();
            return;
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(new bufferstreams(uncssTransform(options)));
            stream.push(file);
            done();
        } else {
            uncss(options.html, objectAssign(options, { raw: String(file.contents) }), function(err, output) {
                if (err) {
                    stream.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
                }
                file.contents = new Buffer(output);
                stream.push(file);
                done();
            });
        }
    };

    return stream;
}

gulpuncss.uncssTransform = uncssTransform;
module.exports = gulpuncss;
