'use strict';

var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    minify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    uncss = require('gulp-uncss'),
    ckeckcss = require('gulp-check-unused-css');

var build = 'assets/dist/';

var jsDir = 'assets/js/',
    cssDir = 'assets/css/';

var jsSrc = [
      'jquery',
      'jquery-ui',
      'filter',
      'index'
    ],
    cssSrc = [
      'bootstrap',
      'jquery-ui',
      'main'
    ];

gulp.task('js', function () {
  return gulp.src(jsSrc.map(function (js) {
    return jsDir.concat(js, '.js')
  }))
      .pipe(concat('app.js'))
      .pipe(gulp.dest(build));
});

gulp.task('css', function () {
  return gulp.src(cssSrc.map(function (css) {
    return cssDir.concat(css, '.css')
  }))
      .pipe(concatCss('app.css'))
      .pipe(gulp.dest(build));
});

gulp.task('min', ['js', 'css'], function () {
  return gulp.src(build + 'app*')
      .pipe(gulpif(['*.js'], minify()))
      .pipe(gulpif(['*.css'], minifyCss()))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(build));
});

gulp.task('clean', function () {
  return del([
    build + 'app.*'
  ]);
});

// gulp.task('html', function () {
//   return gulp.src('index.html')
//       .pipe(htmlmin({collapseWhitespace: true}))
//       .pipe(gulp.dest('.'));
// });

// gulp.task('unused', function () {
//   return gulp.src([build + 'app.css', 'index.html'])
//       .pipe(ckeckcss());
// });

gulp.task('default', ['clean'], function () {
  gulp.start('js', 'css', 'min');
});

