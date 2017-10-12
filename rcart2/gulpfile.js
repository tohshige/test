var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var convertEncoding = require('gulp-convert-encoding');
var iconv = require('gulp-iconv');

// var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
/*
yarn gulp minify-js
yarn gulp bsync
*/

////browser-sync ///////////////////////
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

//  配下の *.html, *.js ファイルが変更されたリロード。
gulp.task('bsync', ['browser-sync'], function () {
    gulp.watch("./*.html", ['bs-reload']);
    gulp.watch("js/*.js", ['bs-reload']);
});

//JS圧縮/////////////////////////////////
// 圧縮処理 utf8   書き出し shift_jis
gulp.task('minify-js', function() {
    // return gulp.src("js/*.js")
    // return gulp.src("js/rcart-utf8.js")
    return gulp.src("js/rcart.js")
        .pipe(iconv({
            decoding: 'shift_jis',// sjis ファイルを
            encoding: 'utf8'      // utf8 に変換、圧縮処理UTF8じゃないと化ける
        }))
        .pipe(uglify()) // compress utf8 only
        .pipe(rename({  // rename
            extname: '.min.js'
        }))
        .pipe(convertEncoding({to: "shift_jis"})) // sjisで保存
        .pipe(gulp.dest('js/'))
        ;
        // .pipe(gulp.dest('dist/js/'));
        //.pipe(gulp.dest('js')); 上書きする場合
});


gulp.task('watch', function(){
//   gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('js/*.js', ['minify-js']);
});


//CSS圧縮
// gulp.task('minify-css', function() {
//     return gulp.src("css/*.css")
//         .pipe(cleanCSS())
//         .pipe(gulp.dest('dist/css/'));
//         //.pipe(gulp.dest('css')); 上書きする場合
// });
