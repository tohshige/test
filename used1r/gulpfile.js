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

var csscss = require('gulp-csscss');

var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

var data = require( 'gulp-data' ); //json-data
var fs = require( "fs" );
var path = require('path'); //path

gulp.task('sass', function() {
  gulp.src('sass/*.scss')
  .pipe(convertEncoding({from: "EUC-JP"}))// encode
  .pipe(sourcemaps.init())
    .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(convertEncoding({to: "EUC-JP"}))// encode
  .pipe(gulp.dest('css/'));
});

gulp.task('css', function() {
  // gulp.src('css/responsive.css')
  gulp.src( ['css/responsive.css'],
            ['css/frame.css'] )
  .pipe(convertEncoding({from: "EUC-JP"}))// encode
  .pipe(csscss())
  .pipe(convertEncoding({to: "EUC-JP"}))// encode
});

/** ディレクトリを指定します。 */
var src = {
  // 出力対象は`_`で始まっていない`.pug`ファイル。
  'html': ['pugorg/**/*.pug', '!' + 'pugorg/**/_*.pug'],
  // JSONファイルのディレクトリを変数化。
  'json': 'src/_data/',
  scss: 'sass/**/*.scss',
  'css': 'src/**/*.css',
  'js': 'src/**/*.js',
  json : '_data'
};

//pug > html
gulp.task('pug2html', () => {
//  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
  return gulp.src(['./pugorg/**/*.pug', '!./pugorg/**/_*.pug'])
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // コンパイルエラーを通知します。  
  // .pipe(convertEncoding({from: "UTF8"}))// from utf8 だと化けるe
  .pipe(convertEncoding({from: "EUC-JP"}))// encode
  .pipe( data( function( file ) {
    var locals  = JSON.parse( fs.readFileSync( src.json + '/site.json' ) );
    locals.relativePath = path.relative( file.base, file.path.replace( /.pug$/, '.html' ) );
    return { 'site' : locals };
  } ) )
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
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // コンパイルエラーを通知します。  
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


/** * ローカルサーバーを起動します。 */
// gulp.task('browser-sync', function() {
gulp.task('bs', function() {
  browserSync({
    server: {
      baseDir: "./",
      index: "pc.html"
    }
  });
});

//CSS圧縮
gulp.task('minify-css', function() {
  return gulp.src("css/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'));
});

/** * PugのコンパイルやCSSとjsの出力、browser-syncのリアルタイムプレビューを実行します。 */
// gulp.task('watch', ['html', 'css', 'js', 'browser-sync'], function() {
gulp.task('watch', ['pug2html',  'browser-sync'], function() {
  gulp.watch(src.html, ['pug2html']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});

gulp.task('w', ['pug2html','sass'], function() {
  gulp.watch(src.html, ['pug2html']);
  gulp.watch(src.scss, ['sass']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});
// Generate pug to html, scss to css
gulp.task('wsass', ['pug2html','sass'], function() {
  gulp.watch(src.html, ['pug2html']);
  gulp.watch(src.scss, ['sass']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});

gulp.task('wSP', ['pug2htmlSP'], function() {
  gulp.watch(src.html, ['pug2htmlSP']);
  // gulp.watch(src.css, ['css']);
  // gulp.watch(src.js, ['js']);
});
