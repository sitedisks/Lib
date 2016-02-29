var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var del = require('del');

gulp.task('default', function() {
  // place code for your default task here
  // plugins.concat = require('gulp-concat');
  return gulp.src('app/**/*')
	.pipe($.if('*.js', $.uglify()))
	.pipe(gulp.dest('dist'));
});

/* dist build */
gulp.task('copyindex', function(){
	return gulp.src('index_build.html')
		.pipe($.rename('index.html'))
		.pipe(gulp.dest('dist'));
});

// gulp.task('tohowfiles',function(){
	// return gulp.src('app/**/*.html')
		// .pipe(gulp.dest('dist/app'));
	
// });

gulp.task('choricecss', function(){
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'
		,'bower_components/toastr/toastr.min.css'
		,'bower_components/font-awesome/css/font-awesome.min.css'
		,'bower_components/angular-loading-bar/src/loading-bar.css'
		,'bower_components/flag-icon-css/css/flag-icon.min.css'
		,'css/gapcss.css', 'css/build.css', 'css/survey.css', 'css/main.css'])
		.pipe($.concat('choricecss.css'))
		.pipe($.minifyCss())
		.pipe(gulp.dest('dist/css'));	
});

gulp.task('ngCodes', function(){
	return gulp.src(['bower_components/jquery/dist/jquery.min.js'
		,'bower_components/toastr/toastr.min.js'
		,'bower_components/lodash/dist/lodash.min.js'
		,'bower_components/angular/angular.js'
		,'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
		,'bower_components/angular-resource/angular-resource.min.js'
		,'bower_components/angular-ui-router/release/angular-ui-router.min.js'
		,'bower_components/angular-local-storage/dist/angular-local-storage.min.js'
		,'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js'
		,'bower_components/angular-google-maps/dist/angular-google-maps.min.js'
		,'bower_components/angular-loading-bar/src/loading-bar.js'
		,'bower_components/angular-translate/angular-translate.min.js'
		,'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js'
		,'bower_components/angular-messages/angular-messages.min.js'])
		.pipe($.if('*.js', $.concat('ngCodes.js'))) 
		.pipe($.uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('choricejs', function(){
	return gulp.src(['js/**/*.js', 'templates/**/*.js'])
		.pipe($.if('*.js', $.concat('choricejs.js'))) 
		.pipe($.uglify())
		.pipe(gulp.dest('dist/js'));	
});


gulp.task('clean', function(done) {
  del(['dist'], done);
});


/* debug */
gulp.task('choricecss_debug', function(){
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'
		,'bower_components/toastr/toastr.min.css'
		,'bower_components/font-awesome/css/font-awesome.min.css'
		,'bower_components/angular-loading-bar/src/loading-bar.css'
		,'bower_components/flag-icon-css/css/flag-icon.min.css'
		,'css/gapcss.css', 'css/build.css', 'css/survey.css', 'css/main.css'])
		// .pipe($.concat('choricecss.css'))
		// .pipe($.minifyCss())
		.pipe(gulp.dest('debug/css'));	
});

gulp.task('ngCodes_debug', function(){
	return gulp.src(['bower_components/jquery/dist/jquery.min.js'
		,'bower_components/toastr/toastr.min.js'
		,'bower_components/lodash/dist/lodash.min.js'
		,'bower_components/angular/angular.js'
		,'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
		,'bower_components/angular-resource/angular-resource.min.js'
		,'bower_components/angular-ui-router/release/angular-ui-router.min.js'
		,'bower_components/angular-local-storage/dist/angular-local-storage.min.js'
		,'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js'
		,'bower_components/angular-google-maps/dist/angular-google-maps.min.js'
		,'bower_components/angular-loading-bar/src/loading-bar.js'
		,'bower_components/angular-translate/angular-translate.min.js'
		,'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js'
		,'bower_components/angular-messages/angular-messages.min.js'])
		// .pipe($.if('*.js', $.concat('ngCodes.js'))) 
		// .pipe($.uglify())
		.pipe(gulp.dest('debug/bower_components'));
});

gulp.task('choricejs_debug', function(){
	return gulp.src(['js/**/*.js', 'templates/**/*.js'])
		// .pipe($.if('*.js', $.concat('choricejs.js'))) 
		// .pipe($.uglify())
		.pipe(gulp.dest('debug/js'));	
});

gulp.task('clean_debug', function(done) {
  del(['debug'], done);
});

gulp.task('build', ['clean', 'tohowindex', 'config', 'fonts', 'tohowfiles', 'tohowcss', 'tohowjs', 'appjs', 'img'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('debug', ['clean_debug', 'choricecss_debug', 'ngCodes_debug', 'choricejs_debug'], function() {
  return gulp.src('debug/**/*').pipe($.size({title: 'build', gzip: true}));
});
