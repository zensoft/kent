var gulp = require('gulp');
//var watch = require('gulp-watch');
var jsTasks = require("./gulp-tasks/js_tasks");
var cssTasks = require("./gulp-tasks/css_tasks");
var htmlTasks = require("./gulp-tasks/html_tasks");

var plugins = {
    minify: require('gulp-minify'),
    concat: require('gulp-concat'),
    clean: require('gulp-clean'),
    merge2: require('merge2'),
    cleanCSS: require('gulp-clean-css'),
    uglify: require('gulp-uglify'),
    autoprefixer: require("gulp-autoprefixer"),
    replacer: require("gulp-replace"),
    rename: require("gulp-rename"),
    toString: require('stream-to-string'),
    fs: require("fs")
};

gulp.task("js-prod", jsTasks(gulp, plugins, "PROD"));
gulp.task("css-prod", cssTasks(gulp, plugins, "PROD"));
gulp.task("build-html", htmlTasks(gulp, plugins, "PROD"));

gulp.task("default", ["js-prod", "css-prod", "build-html"]);

gulp.task('watch', function() {
    //watch("./html/*.html", ['build-html']);//nie zadziala bo "build-html" nie zwraca taska tylko wykonuje funkcje
    gulp.watch("./html/*.html", function () {
        htmlTasks(gulp, plugins, "PROD");
    });
    gulp.watch("./js/src/**", function () {
        jsTasks(gulp, plugins, "PROD");
    });
    gulp.watch("./css/src/**", function () {
        cssTasks(gulp, plugins, "PROD");
    });
});