var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
var browserify    = require('gulp-browserify');
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var gutil         = require('gulp-util');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var cssnano       = require('cssnano');
var del           = require('del');

// delete build folder
gulp.task('clean', function () {
  del.sync(['./build/**/*']);
});

// JS build
gulp.task('build:JS', function () {
  gulp.src('./src/js/*.js')
    // .pipe(rename('app.js'))
    // .pipe(browserify({
    //   insertGlobals : false,
    // }))
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    // .pipe(rename('app.min.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'));
});

// HTML build
gulp.task('build:HTML', function () {
  //
});

// Sass and CSS build
gulp.task('build:CSS', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  gulp.src('./src/css/style.scss')
    .pipe(rename('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

// Image copy
gulp.task('copy:IMG', function () {
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./build/img'));
});

// Font copy
gulp.task('copy:FONT', function () {
  gulp.src('./src/*.otf')
    .pipe(gulp.dest('./build'));
});

// Watchers
gulp.task('watch', ['default'], function () {
  
  function log (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  }

  // watch JS
  gulp.watch('./src/js/**/*.js', ['build:JS'])
    .on('change', function (event) {
      log(event);
    });
  
  // watch HTML
  gulp.watch('./*.html', ['build:HTML'])
    .on('change', function (event) {
      log(event);
    });

  // watch CSS
  gulp.watch('./src/css/**/*.scss', ['build:CSS'])
    .on('change', function (event) {
      log(event);
    });
});

gulp.task('default', ['clean', 'build:JS', 'build:HTML', 'build:CSS', 'copy:IMG', 'copy:FONT']);
