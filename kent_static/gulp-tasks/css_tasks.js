var cssFiles = [
    //"./css/src/libs/bootstrap.css",
    //"./css/src/libs/bootstrap-flex.css",
    //"./css/src/libs/bootstrap-grid.css",
    //"./css/src/libs/bootstrap-reboot.css"
    "./css/src/libs/normalize.css",
    "./css/src/libs/style.css",
    "./css/src/libs/examples.css"
];

function clearFolder(gulp, plugins) {
    gulp.src("./css/dist/*").
    pipe(plugins.clean());
}


function cssProd(gulp, plugins) {
    gulp.src(cssFiles)
        .pipe(plugins.cleanCSS())
        .pipe(plugins.concat("libs.min.css"))
        .pipe(gulp.dest("./css/dist"));

    gulp.src("./css/src/app.css")
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCSS())
        .pipe(plugins.concat("app.min.css"))
        .pipe(gulp.dest("./css/dist"));
}


function cssTasks(gulp, plugins, mode) {
    clearFolder(gulp, plugins);
    if (mode === "PROD") {
        cssProd(gulp, plugins);
    } else {
        //cssDebug(gulp, plugins);
    }
}

module.exports = function (gulp, plugins, mode) {
    return cssTasks(gulp, plugins, mode);
}