'use strict';

var gulp   = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('develop', function() {
    function scripts() {
        return gulp.src('*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    }

    var watcher = gulp.watch('*.js');
    watcher.on('change', scripts);

    return scripts();
});
