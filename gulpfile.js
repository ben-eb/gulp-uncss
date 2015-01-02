/* jshint node:true */

'use strict';

var gulp   = require('gulp'),
    mocha  = require('gulp-mocha'),
    jshint = require('gulp-jshint');

gulp.task('develop', function() {
    function scripts() {
        return gulp.src('*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(mocha({ reporter: 'mocha-silent-reporter' }));
    }

    var watcher = gulp.watch('*.js');
    watcher.on('change', scripts);

    return scripts();
});
