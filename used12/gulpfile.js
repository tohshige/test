var gulp = require("gulp");
var browserSync =require("browser-sync");

gulp.task("default",function(){

 browserSync.init({
	 server:{
		 baseDir: "../used12"
		  ,index  : "pc.html"
}
 });
	
	gulp.watch("used12/**",function(){
		browserSync.reload();
	});
	});
	