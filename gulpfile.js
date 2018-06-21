var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


gulp.task('less', function() {
    return gulp.src('src/less/index.less')
      .pipe(sourcemaps.init())
      .pipe(plumber())
      // .pipe(autoprefixer())
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', ['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/less/**/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// gulp.task('default', gulp.series('watch'));

