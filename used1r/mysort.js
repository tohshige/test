var gutil = require('gulp-util')
var through = require('through2')
// var path = require('path')

module.exports = function () {
  var transform = function (file, enc, callback) {
    var content = file.contents.toString()
    console.log(content)

    // Do something to content here
    function objectArraySort (data, key, order) {
      // data.toUpperCase();
      // デフォは降順(DESC)
      var numA = -1
      var numB = 1

      if (order === 'asc') { // 指定があれば昇順(ASC)
        numA = 1
        numB = -1
      }
      //  data  = Array.prototype.join.call(data);
      data = Array.prototype.slice.call(data)
      data = Array.from(data)
      //  data  = Array.prototype.apply(null,data);

      // data.sort(function(val1, val2) {
      //   return ( val1[key] < val2[key] ? 1 : -1);
      // });
      // data.sort();

      data.sort(function (a, b) {
        //  data =  [].slice.call(data).sort(function(a, b){
        var x = a[key]
        var y = b[key]
        if (x > y) return numA
        if (x < y) return numB
        return 0
      })
      return data // ソート後の配列を返す
    }

    // objectArraySort(files[0].contents.toString(), 'path', 'asc', function(new_data){
    // objectArraySort(content, '画像パス', 'asc', function(new_data){
    //   console.log(new_data);
    //   content = new_data;
    // });
    // content = objectArraySort(content, '画像パス', 'asc');
    content = objectArraySort(content, 'id', 'asc')
    content = objectArraySort(content, 'number', 'asc')
    console.log(content)

    console.log('dir ' + __dirname)
    console.log('path ' + file.path)

    var newfile = new gutil.File({
      // cwd: __dirname,
      // path: path.join( __dirname, file.path ), // Do something if you need
      path: 'all11.json', // Do something if you need
      contents: new Buffer(JSON.stringify(content) + '\n')
      // contents: new Buffer( JSON.stringify( content ) )
      // contents: new Buffer(  content  )
    })

    this.push(newfile)
    return callback()
  }

  return through.obj(transform)
}
