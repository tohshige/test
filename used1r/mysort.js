var gutil = require( 'gulp-util' );
var through  = require( 'through2' );
var path = require( 'path' );

module.exports = function () {
  var transform = function( file, enc, callback ) {
    var content = file.contents.toString();
    console.log(content);
    
    // Do something to content here
    function object_array_sort(data,key,order){
      // data.toUpperCase();
            //デフォは降順(DESC)
      var num_a = -1;
      var num_b = 1;
  
      if(order === 'asc'){//指定があれば昇順(ASC)
        num_a = 1;
        num_b = -1;
      }
    //  data  = Array.prototype.join.call(data);
     data  = Array.prototype.slice.call(data);
     data  = Array.from(data);
    //  data  = Array.prototype.apply(null,data);

    // data.sort(function(val1, val2) {
    //   return ( val1[key] < val2[key] ? 1 : -1);
    // });
    // data.sort();
      
     data.sort(function(a, b){
    //  data =  [].slice.call(data).sort(function(a, b){
        var x = a[key];
        var y = b[key];
        if (x > y) return num_a;
        if (x < y) return num_b;
        return 0;
      });
     return data; // ソート後の配列を返す
    }

    // object_array_sort(files[0].contents.toString(), 'path', 'asc', function(new_data){
    // object_array_sort(content, '画像パス', 'asc', function(new_data){
    //   console.log(new_data);
    //   content = new_data;
    // });
    // content = object_array_sort(content, '画像パス', 'asc');
    content = object_array_sort(content, 'id', 'asc');
    content = object_array_sort(content, 'number', 'asc');
    console.log(content);
    

    console.log('dir '+ __dirname);
    console.log('path '+file.path);
    
    var newfile = new gutil.File( {
      // cwd: __dirname,
      // path: path.join( __dirname, file.path ), // Do something if you need
      path: 'all11.json', // Do something if you need
      contents: new Buffer( JSON.stringify( content ) + "\n" )
      // contents: new Buffer( JSON.stringify( content ) )
      // contents: new Buffer(  content  )
    } );

    this.push( newfile );
    return callback();
  };

  return through.obj( transform );
};