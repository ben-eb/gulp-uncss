'use strict';

var test   = require('tape'),
    gutil  = require('gulp-util'),
    uncss  = require('./'),
    Stream = require('stream'),

    html   = '<html><body><h1>hello</h1></body></html>',
    css    = 'h2 { color:blue; } h1 { color:red }',
    output = 'h1 {\n  color: red;\n}\n';

function fixture (contents) {
    return new gutil.File({
        contents: contents,
        cwd: __dirname,
        base: __dirname,
        path: __dirname + '/fixture.css'
    });
}

test('should not throw on an empty file', function (t) {
    t.plan(1);

    var stream = uncss({html: html});

    stream.on('data', function (data) {
        t.equal(String(data.contents), '');
    });

    var file = fixture(new Buffer(''));

    stream.write(file);
});

test('should remove unused css selectors', function (t) {
    t.plan(1);

    var stream = uncss({html: html});

    stream.on('data', function (data) {
        t.equal(String(data.contents), output);
    });

    var file = fixture(new Buffer(css));

    stream.write(file);
});

test('should throw an error in stream mode', function (t) {
    t.plan(1);

    var stream = uncss({html: html});

    var file = fixture(new Stream());

    var write = function () {
        stream.write(file);
        file.contents.write(css);
        file.contents.end();
    };

    t.throws(write, 'should not support streaming contents');
});

test('should let null files pass through', function (t) {
    t.plan(1);

    var stream = uncss({html: html});

    stream.on('data', function (data) {
        t.equal(data.contents, null, 'should not transform null in any way');
    });

    var file = fixture(null);

    stream.write(file);
});
