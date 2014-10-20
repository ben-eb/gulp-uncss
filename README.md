# [gulp](https://github.com/gulpjs/gulp)-uncss [![Build Status](https://travis-ci.org/ben-eb/gulp-uncss.svg?branch=master)](https://travis-ci.org/ben-eb/gulp-uncss) [![NPM version](https://badge.fury.io/js/gulp-uncss.svg)](http://badge.fury.io/js/gulp-uncss) [![Dependency Status](https://gemnasium.com/ben-eb/gulp-uncss.svg)](https://gemnasium.com/ben-eb/gulp-uncss)

> Remove unused CSS with [UnCSS](https://github.com/giakki/uncss).

*If you have any difficulties with the output of this plugin, please use the [UnCSS tracker](https://github.com/giakki/uncss/issues).*

Install via [npm](https://npmjs.org/package/gulp-uncss):

```
npm install gulp-uncss --save-dev
```

## Example

```js
var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('simple', function() {
    return gulp.src('site.css')
        .pipe(uncss({
            html: ['index.html', 'about.html']
        }))
        .pipe(gulp.dest('./out'));
});
```

## Glob example

UnCSS does not provide native support for globbing patterns. If you would like gulp-uncss to parse a directory recursively, then you can use the [glob module](https://www.npmjs.org/package/glob) like so:

```js
var glob = require('glob');

gulp.task('glob', function() {
    gulp.src('site.css')
        .pipe(uncss({
            html: glob.sync('templates/**/*.html')
        }))
        .pipe(gulp.dest('./out'));
});
```

## URL example

UnCSS can also visit your website for the HTML it uses to analyse the CSS against. Here is an example:

```js
gulp.task('urls', function() {
    gulp.src('site.css')
        .pipe(uncss({
            html: [
                'http://www.example.com'
            ]
        }))
        .pipe(gulp.dest('./out'));
});
```

Note that you can mix and match URLs and paths to files using the `html` option.

## Options

This plugin takes slightly different options to the UnCSS module, because it is essentially just a streaming wrapper which returns a CSS stream.

### html
Type: `Array|String`
*Required value.*

An array which can contain an array of files relative to your `gulpfile.js`, and which can also contain URLs. Note that if you are to pass URLs here, then the task will take much longer to complete. If you want to pass some HTML directly into the task instead, you can specify it here as a string.

### ignore
Type: `Array`
Default value: `undefined`

Selectors that should be left untouched by UnCSS as it can't detect user interaction on a page (hover, click, focus, for example). Both literal names and regex patterns are recognized.

### timeout
Type: `Integer`
Default value: `undefined`

Specify how long to wait for the JS to be loaded.
