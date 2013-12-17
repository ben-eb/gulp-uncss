'use strict';

var expect = require('chai').expect;
var gutil = require('gulp-util');
var uncss = require('./index');

var html = '<html><body><h1>hello</h1></body></html>';
var css = 'h2 { color:blue; } h1 { color:red }';
var compressed = 'h1{color:red}';

describe('gulp-uncss', function() {
    this.timeout(10000);
    it('should remove unused css selectors', function(cb) {
        var stream = uncss({
            html: html
        });
        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(compressed);
            cb();
        });
        stream.write(new gutil.File({
            contents: css
        }));
    });
});
