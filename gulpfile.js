var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');

gulp.task('test', function() {
  return gulp.src(['dist/test/**_test.js'], {read: false})
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('build', function() {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = tsProject.src()
    .pipe(tsProject());

  tsResult.js.pipe(gulp.dest('dist'));
});