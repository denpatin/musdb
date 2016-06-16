'use strict';

var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    minify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename');

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

gulp.task('default', function () {
  gulp.start('clean', 'js', 'css', 'min');
});
