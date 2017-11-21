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

var csv2json = require('gulp-csv2json');
var rename = require('gulp-rename');
var concat = require("gulp-concat");
var sortJSON = require('gulp-json-sort').default;

var gutil = require('gulp-util');

const reorder = require('csv-reorder');
var replace = require('gulp-replace');

// ファイルの結合
gulp.task('concat', function() {
  return gulp.src(['_data/*.csv','!_data/all.csv'])
  .pipe(convertEncoding({from: "SHIFT-JIS"}))// encode
  .pipe(plumber())
  .pipe(concat('all.csv'))
  .pipe(convertEncoding({to: "UTF-8"}))// encode
  .pipe(gulp.dest('_data'));
});

// ファイルの結合
gulp.task('concatest', function() {
  return gulp.src(['_data/0*.csv','_data/19*_1.csv','!_data/all.csv'])
  .pipe(convertEncoding({from: "SHIFT-JIS"}))// encode
  .pipe(plumber())
  .pipe(concat('all.csv'))
  .pipe(convertEncoding({to: "UTF-8"}))// encode
  .pipe(gulp.dest('_data'));
});

// 正規表現でも文字列置換ができる
gulp.task('replace', function(){
  gulp.src(['./dl-item201711171358-1.csv','!./all.csv'])
    .pipe(convertEncoding({from: "SHIFT-JIS"}))// encode
    .pipe(convertEncoding({to: "UTF-8"}))// encode
    .pipe(gulp.dest('dist'));
    
  // gulp.src(['dist/dl-item201711171358-1.csv','!dist/all.csv'])
  //   .pipe(replace(/([^\"|\n])(\n)+/g, '$1'))
  //   .pipe(gulp.dest('dist'));

  // // ファイルの結合 with header column
  // gulp.src(['dist/*.csv','!dist/all.csv'])
  //   .pipe(concat('all.csv'))
  //   .pipe(gulp.dest('dist'));

  });


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
  html: ['pugorg/**/*.pug', '!' + 'pugorg/**/_*.pug'],
  // JSONファイルのディレクトリを変数化。
  csv: '_data/',
  scss: 'sass/**/*.scss',
  css: 'src/**/*.css',
  js: 'src/**/*.js',
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
    // return { 'site' : locals };
    var images  = JSON.parse( fs.readFileSync( src.json + '/all.json'));
    return {  'site' : locals, 'images' : images };
    // 199614_20171109_20171109_1.csv
  } ) )
  .pipe(pug({
    pretty: true
  }))
  // .pipe(convertEncoding({to: "EUC-JP"}))// encode
  // .pipe(gulp.dest('./nohin'))
  .pipe(replace('euc-jp', 'UTF-8'))// for bs
  .pipe(convertEncoding({to: "UTF-8"}))// for bs
  //  .pipe(gulp.dest('./html/'));
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('csv2json', function () {
  var columns =['1','2','url','4','5'];
  var csvParseOptions = {'columns':columns}; //based on options specified here : http://csv.adaltas.com/parse/ 
  var csvParseOptions = {columns:false}; //based on options specified here : http://csv.adaltas.com/parse/ 
  // var sortColumn = [1];
  

    // gulp.src('_data/**/*.csv')
    gulp.src('_data/all.csv')
      // .pipe(convertEncoding({from: "SHIFT-JIS"}))// encode
      .pipe(csv2json(csvParseOptions))
      .pipe(rename({extname: '.json'}))

      // .pipe(convertEncoding({to: "UTF-8"}))// encode
      .pipe(sortJSON({ space: 2 }))
      .pipe(gulp.dest('_data'));
      //test of sort jasonnpm install csv-reorder
    // gulp.src('_data/all1.json')
    //   .pipe(mysort())
    //   .pipe(gulp.dest('_data1'));

    reorder({
      input: './_data/all.csv',
      output:'./_data/all.csv',
      sort: 'path',
      // sort: '画像パス',
      // sort: '%e7%94%bb%e5%83%8f%e3%83%91%e3%82%b9',
      // sort: sortColumn,
      type: 'string',
      descending: false,
      remove: true,
      metadata: false
    })
    .then(metadata => {
      var green = '\u001b[32m';
      console.info(green + 'complete reorder!')
    })
    .catch(error => {
      var red = '\u001b[31m';
      console.error(red + 'error reorder')
      console.error(sortColumn)
    });
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
    .pipe(browserSync.reload({
      stream: true,
      once : true
    }));
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
    // server: {
    //   baseDir: "./",
    //   index: "pcList.html",
    //   directory: false
    // },
    init: {
      // proxy: "localhost:8888/test/used1r/pcList.html",
      proxy: "localhost:8888",
      files: [
        // "./dist/styles/**/*.css",
        // "./dist/scripts/**/*.js",
        "./**/*.html",
      ]
    },

    // open  :true,
    // // open  :false,
    // notify:true,
    // xip   :false
  });
});

gulp.task('bsutf8', function() {
  browserSync({
    server: {
      baseDir: "./",
      // index: "pcList.html",
      directory: true
    },
    open  :true,
    // open  :false,
    notify:true,
    xip   :false
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
// gulp.task('watch', ['pug2html',  'browser-sync'], function() {
//   gulp.watch(src.html, ['pug2html']);
//   // gulp.watch(src.css, ['css']);
//   // gulp.watch(src.js, ['js']);
// });
var reload = browserSync.reload;
gulp.task("watch", function () {
  gulp.watch('./*.html', reload);
});


// gulp.task('w', ['pug2html','sass'], function() {
gulp.task('w', ['bsutf8','pug2html','sass','watch'], function() { //browser-sync
  gulp.watch(src.html, ['pug2html']);
  gulp.watch(src.scss, ['sass']);
  gulp.watch('_data/site.json', ['pug2html']);
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
