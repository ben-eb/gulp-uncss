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

gulp.task('default', function() {
    return gulp.src('site.css')
        .pipe(uncss({
            html: ['index.html', 'about.html']
        }))
        .pipe(gulp.dest('./out'));
});
```

## Options

This plugin takes slightly different options to the `uncss` module, because it is essentially just a streaming wrapper which returns a CSS stream.

### html
Type: `Array|String`
*Required value.*

An array of HTML files relative to the Gulpfile OR a raw string of HTML.

### ignore
Type: `Array`
Default value: `undefined`

Selectors that should be left untouched by UnCSS as it can't detect user interaction on a page (hover, click, focus, for example). Both literal names and regex patterns are recognized.

### timeout
Type: `Integer`
Default value: `undefined`

Specify how long to wait for the JS to be loaded.
