var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'test Express' });
  // res.render('pc');
});

router.get('/pc', function(req, res, next) {
  res.render('pc', { 
    title: 'test Express',
    site:{
      name : 'test'
    }
   });
  // res.render('pc');
});

var fs = require( "fs" );
router.get('/pclist', function(req, res, next) {
  // var locals  = JSON.parse( fs.readFileSync( src.json + '/site.json' ) );
  // locals.relativePath = path.relative( file.base, file.path.replace( /.pug$/, '.html' ) );
  // return { 'site' : locals };
  var images  = JSON.parse( fs.readFileSync(  '/Users/mono05/Documents/test/express/view/views/all.json'));
  res.render('pcList', { 
    title: 'test Express',
    site:{
      name : 'test'
    },
    images:images
   });
  // res.render('pc');
});

module.exports = router;
