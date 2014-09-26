/* jshint node: true */
/* global describe, it */

'use strict';

var expect = require('chai').expect,
    gutil  = require('gulp-util'),
    uncss  = require('./index'),
    Stream = require('stream'),
    es     = require('event-stream'),

    html   = '<html><body><h1>hello</h1></body></html>',
    css    = 'h2 { color:blue; } h1 { color:red }',
    output = 'h1 {\n  color: red;\n}\n';

describe('gulp-uncss', function() {
    this.timeout(10000);
    it('should remove unused css selectors', function(cb) {
        var stream = uncss({
            html: html
        });
        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(output);
            cb();
        });
        stream.write(new gutil.File({
            contents: new Buffer(css)
        }));
    });

    it('in stream mode should throw an error', function(cb) {
        var stream = uncss({
            html: html
        });

        var fakeFile = new gutil.File({
            contents: new Stream()
        });

        var doWrite = function() {
            stream.write(fakeFile);
            fakeFile.contents.write(css);
            fakeFile.contents.end();
        };

        expect(doWrite).to.throw(/Streaming not supported/);
        cb();
    });

    it('should let null files pass through', function(cb) {
        var n = 0,
            stream = uncss({
                html: html
            });

        stream.pipe(es.through(function(file) {
            expect(file.path).to.equal('null.md');
            expect(file.contents).to.equal(null);
            n++;
        }, function() {
            expect(n).to.equal(1);
            cb();
        }));

        stream.write(new gutil.File({
            path: 'null.md',
            contents: null
        }));
        stream.end();
    });
});
