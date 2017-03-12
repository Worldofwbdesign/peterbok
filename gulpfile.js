var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		rename       = require('gulp-rename'),
		sftp         = require('gulp-sftp'),
		ftp          = require( 'vinyl-ftp' ),
		notify       = require("gulp-notify"),
		browserSync  = require('browser-sync').create();

gulp.task('browser-sync', ['styles'], function() {
		browserSync.init({
				host: 'thepeterbok.com',
				proxy: 'https://thepeterbok.com/',
  			host: 'thepeterbok.com',
  			open: 'external'
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles', 'deploy-dev']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('deploy-dev', function() {
    var conn = ftp.create( {
        host: 'thepeter.ftp.ukraine.com.ua',
        user: 'thepeter_roman',
        password: 'nze6563n',
        parallel: 3
    } );
    /* list all files you wish to ftp in the glob variable */
    var globs = [
        'app/css/main.css'
    ];
    return gulp.src( globs, { buffer: false } )
        .pipe( conn.dest( '/thepeterbok.com/www/wp-content/themes/thepeterbok/css/' ) )
        .pipe(notify("Dev site updated!"));
});
gulp.task('default', function () {
    gulp.watch(['*', '**/*'], ['deploy-dev']);
});

gulp.task('deploy', function () {
    return gulp.src('app/css/main.css')
    .pipe(sftp({
        host: 'thepeter.ftp.ukraine.com.ua',
        user: 'thepeter_roman',
        pass: 'nze6563n',
        remotePath : '/thepeterbok.com/www/wp-content/themes/thepeterbok/css'
    }));
});

gulp.task('default', ['browser-sync', 'watch']);
