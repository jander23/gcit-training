"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
	port: 9090,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', gulp.series(function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
}));

gulp.task('open', gulp.series(['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
}));

gulp.task('html', gulp.series(function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
}));

gulp.task('js', gulp.series(function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["es2015", "react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
}));

gulp.task('css', gulp.series(function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
}));

gulp.task('images', gulp.series(function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
}));

gulp.task('lint', gulp.series(function() {
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
}));

gulp.task('watch', gulp.series(function() {
	gulp.watch(config.paths.html, gulp.series(['html']));
	gulp.watch(config.paths.js, gulp.series(['js', 'lint']));
}));

gulp.task('default', gulp.parallel(['html', 'js', 'css', 'images', 'lint', 'open', 'watch']));
