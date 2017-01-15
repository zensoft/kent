var outLibFile = "libs.min.js";
var app = "./js/src/app.js";
var outAppFile = "app.min.js";
var outDist = "./js/dist";
var jsLibs = [
    "./js/src/libs/jquery.min.js",
    "./js/src/libs/TweenMax.min.js",
    "./js/src/libs/ScrollMagic.min.js",
    //"./js/src/libs/jquery.ScrollMagic.min.js",
    "./js/src/libs/tether.min.js",
    "./js/src/libs/bootstrap.min.js",
    "./js/src/libs/animation.gsap.min.js",
    "./js/src/libs/animation.velocity.min.js",
    "./js/src/libs/debug.addIndicators.min.js"

];

function clearFolders(gulp, plugins) {
    gulp.src(["./js/dist/*"])
        .pipe(plugins.clean());
}

function getLibStream(gulp, plugins) {
    return gulp
        .src(jsLibs)
        .pipe(plugins.concat(outLibFile));
}

function jsProd(gulp, plugins) {
    getLibStream(gulp, plugins)
        .pipe(gulp.dest(outDist));

    gulp.src(app)
        .pipe(plugins.minify({
                noSource: true,
                ext: ".min.js"
            }))
        .pipe(gulp.dest(outDist));
}

function jsTasks(gulp, plugins, mode) {
    clearFolders(gulp, plugins);
    if (mode === "PROD") {
        jsProd(gulp, plugins);
    } else {
        //jsDebug(gulp, plugins);
    }
}

module.exports = function (gulp, plugins, mode) {
    return jsTasks(gulp, plugins, mode);
}