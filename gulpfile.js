var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var gulp = require('gulp');
var uglify = require('gulp-uglify');

var paths = {
  ng_annotate: ['./public/js/*.js']
};

gulp.task('default', function (done) {
  gulp.src('./public/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/dest'))
});