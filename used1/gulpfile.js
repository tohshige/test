//plug-in
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var pug = require('gulp-pug');
var jade = require('gulp-jade');
var convertEncoding = require('gulp-convert-encoding');

const html2pug = require('gulp-html2pug');
const html2jade = require('gulp-html2jade');
const options = {nspaces:2};


//pug > html
gulp.task('pug2html', () => {
//  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
 return gulp.src(['./pugorg/**/*.pug', '!./pugorg/**/_*.pug'])
 .pipe(convertEncoding({from: "EUC-JP"}))// encode
 .pipe(pug({
   pretty: true
 }))
 .pipe(convertEncoding({to: "EUC-JP"}))// encode
//  .pipe(gulp.dest('./html/'));
 .pipe(gulp.dest('./'));
});

// html > pug
gulp.task('html2pug', function(){
  return gulp.src(['./html/*.html', '!./html_*.html'])
    .pipe(convertEncoding({from: "EUC-JP"}))// encode
    .pipe(html2pug(options))
    .pipe(convertEncoding({to: "EUC-JP"}))// encode
    .pipe(gulp.dest('./pugorg/'));
});


//CSS°µ½Ì
gulp.task('minify-css', function() {
  return gulp.src("css/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'));
});

//jade > html
// gulp.task('jade', () => {
//  return gulp.src(['./jade/**/*.jade', '!./jade/**/_*.jade'])
//  .pipe(jade({
//    pretty: true
//  }))
//  .pipe(gulp.dest('./html/'));
// });


// gulp.task('html2jade', function(){
//   return gulp.src(['./*.html', '!./_*.html'])
//     .pipe(html2jade(options))
//     .pipe(gulp.dest('./jadeorg/'));
// });

