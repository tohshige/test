//plug-in
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var pug = require('gulp-pug');
var jade = require('gulp-jade');
var convertEncoding = require('gulp-convert-encoding');

const html2pug = require('gulp-html2pug');
const html2jade = require('gulp-html2jade');
const options = {nspaces:2};
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

/** �ǥ��쥯�ȥ����ꤷ�ޤ��� */
var src = {
  // �����оݤ�`_`�ǻϤޤäƤ��ʤ�`.pug`�ե����롣
  'html': ['pugorg/**/*.pug', '!' + 'pugorg/**/_*.pug'],
  // JSON�ե�����Υǥ��쥯�ȥ���ѿ�����
  'json': 'src/_data/',
  'css': 'src/**/*.css',
  'js': 'src/**/*.js',
};

//pug > html
gulp.task('pug2html', () => {
//  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
  return gulp.src(['./pugorg/**/*.pug', '!./pugorg/**/_*.pug'])
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // ����ѥ��륨�顼�����Τ��ޤ���  
  .pipe(convertEncoding({from: "EUC-JP"}))// encode
  .pipe(pug({
    pretty: true
  }))
  .pipe(convertEncoding({to: "EUC-JP"}))// encode
  //  .pipe(gulp.dest('./html/'));
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('pug2htmlSP', () => {
    return gulp.src(['./pugorg/sp.pug', '!./pugorg/**/_*.pug'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // ����ѥ��륨�顼�����Τ��ޤ���  
    .pipe(pug({
      pretty: true
    }))
    //  .pipe(gulp.dest('./html/'));
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream: true}));
  });

// html > pug
gulp.task('html2pug', function(){
  return gulp.src(['./html/modal1.html', '!./html/_*.html'])
    .pipe(convertEncoding({from: "EUC-JP"}))// encode
    .pipe(html2pug(options))
    .pipe(convertEncoding({to: "EUC-JP"}))// encode
    .pipe(gulp.dest('./pugorg/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html2pugUtf8SP', function(){
  return gulp.src(['./html/sp.html', '!./html/_*.html'])
    .pipe(html2pug(options))
    .pipe(gulp.dest('./pugorg/'))
    .pipe(browserSync.reload({stream: true}));
});


/** * �������륵���С���ư���ޤ��� */
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./",
      index: "pc.html"
    }
  });
});

//CSS����
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

/** * Pug�Υ���ѥ����CSS��js�ν��ϡ�browser-sync�Υꥢ�륿����ץ�ӥ塼��¹Ԥ��ޤ��� */
// gulp.task('watch', ['html', 'css', 'js', 'browser-sync'], function() {
gulp.task('watch', ['pug2html',  'browser-sync'], function() {
  gulp.watch(src.html, ['pug2html']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});

gulp.task('w', ['pug2html'], function() {
  gulp.watch(src.html, ['pug2html']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});

gulp.task('wSP', ['pug2htmlSP'], function() {
  gulp.watch(src.html, ['pug2htmlSP']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});