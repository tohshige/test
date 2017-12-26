//plug-in
var gulp = require('gulp');
var changed = require('gulp-changed');//変更されたファイルのみを渡す?イマイチ
var cached = require('gulp-cached');//キャッシュして、変更されたファイルのみを渡す?イマイチ
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
var csvtojson = require('csvtojson').csvtojson;
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

// CSV Shiftjis To Utf8
gulp.task('shift2utf8', function(){
  // gulp.src(['./dl-item201711171358-1.csv','!./all.csv'])
  return gulp.src(['./dist/dl-*20*-1.csv','!./all.csv'])
    .pipe(convertEncoding({from: "SHIFT-JIS"}))// encode
    .pipe(convertEncoding({to: "UTF-8"}))// encode
    .pipe(rename({  extname: '.utf8.csv'  }))
    .pipe(gulp.dest('dist'));
    // callback();
    
});
// 正規表現でも文字列置換
gulp.task('replace', function(){
  return gulp.src(['dist/dl-item20*.utf8.csv','!dist/all.csv'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    // ダブルクオーテーション + 複数改行 を削除 
    .pipe(replace(/([^\"|\n])(\n)+/g, '$1')) // org
    // ダブルクオーテーション + 単数改行 を削除 
    .pipe(replace(/(\"\n)/g, '')) // org

    // .pipe(replace(/(\"\")(\u3000)+/g, '$1'))
    .pipe(replace(/(\,)(?!\")/g,  ',"'))  // ," となってないのを修正
    
    // .pipe(replace(/(?<!\")(\,)/g,  '",')) // ", となってないのを修正

    // .pipe(replace(/(\"\n)(\n)+|(\"\n)|([^\"|\n])(\n)+/g, '$1')) // org
              //  "+複数改行  "+改行  "+複数改行 複数改行 "+全角スペース
    // .pipe(replace(/(\"\n)(\n)+|(\"\n)|([^\"|\n])(\n)+|(\"\")(\u3000)+/g, '$1')) // org
    // .pipe(replace(/(\"\n)(\n)+|(\"\n)|([^\"|\n])(\n)+/g, '$1')) // org
    .pipe(gulp.dest('dist'));

  // gulp.src(['dist/dl-item201711171358-1.csv','!dist/all.csv'])
  //   .pipe(replace(/(\"\n)/g, '$1')) // // "の次すぐ改行文字
  //   .pipe(gulp.dest('dist'));

});

// // ファイルの結合 with header column
gulp.task('concat2', function(){
  return gulp.src(['dist/0dl-itemHeader*.utf8.csv','dist/dl-*.utf8.csv','!dist/all.utf8.csv'])
    .pipe(concat('all.utf8.csv'))
    .pipe(gulp.dest('dist'));
});

// 'shift2utf8','replace', 'concat2', 'csvjson2'


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
  html: ['pugorg/**/*.pug', '!' + 'pugorg/**/_item*.pug'],
  // JSONファイルのディレクトリを変数化。
  csv: '_data/',
  scss: 'sass/**/*.scss',
  css: 'src/**/*.css',
  js: 'src/**/*.js',
  json : '_data'
};

//pug > html
gulp.task('pug2html', () => {
var DEST = './' ;
  // return gulp.src(['./pugorg/**/*.pug', '!./pugorg/**/_*.pug']) //
  return gulp.src(['./pugorg/**/*.pug'])
  // .pipe(cached( 'pug2html' )) // キャッシュ処理 変更のあったファイルのみ実行される
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // コンパイルエラーを通知します。  
  // .pipe(convertEncoding({from: "UTF8"}))// from utf8 だと化けるe
  .pipe(convertEncoding({from: "EUC-JP"}))// encode
  .pipe( data( function( file ) {
    var locals  = JSON.parse( fs.readFileSync( src.json + '/site.json' ) );
    locals.relativePath = path.relative( file.base, file.path.replace( /.pug$/, '.html' ) );
    // return { 'site' : locals };
    var images  = JSON.parse( fs.readFileSync( src.json + '/all.json'));
    var images2 = JSON.parse( fs.readFileSync( 'dist/all.utf8.json'));
    var selects = JSON.parse( fs.readFileSync( 'dist/all-select.utf8.json'));
    return {  'site' : locals , 'images' : images, 'images2' : images2 , 'selects' : selects };
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
  .pipe(gulp.dest(DEST))
  // .pipe(browserSync.reload({stream: true}));
  .pipe(browserSync.stream());
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


// version2
gulp.task('csv2json2', function (callback) {
  var Converter = require("csvtojson").Converter;
  var converter = new Converter({});
  var converter1 = new Converter({});
  var indentSpace = '  ';
  
  converter.on("end_parsed", function (jsonArray) {
      fs.writeFile('dist/all.utf8.json', JSON.stringify(jsonArray, null, indentSpace));
      console.log("complete JSON!!");
      callback();
  });
  require("fs").createReadStream("dist/all.utf8.csv").pipe(converter);

  // dl-selectxxxx.csv
  // converter1.on("end_parsed", function (jsonArray) {
  //     fs.writeFile('dist/all-select.utf8.json', JSON.stringify(jsonArray, null, indentSpace));
  //     console.log("complete JSON!!");
  //     callback();
  // });
  // require("fs").createReadStream("dist/dl-select201712261320-1.utf8.csv").pipe(converter1);


  // var columns =['1','2','url','4','5'];
  // var csvParseOptions = {'columns':columns}; //based on options specified here : http://csv.adaltas.com/parse/ 
  // var csvParseOptions = {columns:false }; //based on options specified here : http://csv.adaltas.com/parse/ 
  //   gulp.src('dist/all.utf8.csv')
  //     .pipe(csv2json(csvParseOptions))
  //     .pipe(rename({extname: '.json'}))

  //     .pipe(sortJSON({ space: 2 }))
  //     .pipe(gulp.dest('dist'));

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

var reload = browserSync.reload;
gulp.task("watch", function () {
  gulp.watch('./*.html', reload);
  gulp.watch('./css/*.css.', reload);
});


// gulp.task('w', ['pug2html','sass'], function() {
gulp.task('w', ['bsutf8','pug2html','sass','watch'], function() { //browser-sync
  gulp.watch(src.html, ['pug2html']);
  gulp.watch(src.scss, ['sass']);
  gulp.watch('css/**/*.css', ['sass']);
  gulp.watch('_data/site.json', ['pug2html']);
  // gulp.watch(src.js, ['js']);
});

gulp.task('csvjson-help', function(callback) {
  var comment = '\
  check dist/dl-item2017xxxx.csv  \n\
  now convert to dist/all.utf8.json ! \n\
  end of line \n\
  ';
  console.log(comment);
  callback();
});
// input : @upload.rakuten.ne.jp /ritem/download/ のCSV dl-item2017xxxx.csv
// output: dist/all.utf8.json
// run-sequence 順番に処理
var runSequence = require('run-sequence');
gulp.task('csvjson', function(callback) {
  runSequence(
  'csvjson-help',// help massage
  'shift2utf8',  // csv ファイルを shift-jis to utf8
  'replace',     // csv 内のHTML改行を置換、削除
  'concat2',     // csv header 行を結合
  'replace',     // csv 内のHTML改行を置換、削除
  'csv2json2',   // pug 用にJSON化
  callback);
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
