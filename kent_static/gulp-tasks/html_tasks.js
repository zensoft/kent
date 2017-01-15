function clearFolder(gulp, plugins) {
    gulp.src("../index.html").
    pipe(plugins.clean({force:true}));
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function replaceRev(fileContents) {
    return replaceAll(fileContents, "#REV#", "?version=" + new Date().getTime());
}

function getScriptsContent(plugins) {
    var scriptsContent = plugins.fs.readFileSync("./html/scripts.html", "utf8");
    return replaceRev(scriptsContent);
}

function getCssContent(plugins) {
    var scriptsContent = plugins.fs.readFileSync("./html/css.html", "utf8");
    return replaceRev(scriptsContent);
}

function htmlProd(gulp, plugins) {
    var scriptsContent = getScriptsContent(plugins);
    var cssContent = getCssContent(plugins);
    gulp.src("./html/layout.html")
        .pipe(plugins.replacer("##SCRIPTS##", scriptsContent))
        .pipe(plugins.replacer("##CSS##", cssContent))
        .pipe(plugins.rename("index.html"))
        .pipe(gulp.dest(".."));
}

function htmlTasks(gulp, plugins, mode) {
    clearFolder(gulp, plugins);
    if (mode === "PROD") {
        htmlProd(gulp, plugins);
    } else {
        //debug
    }
}
module.exports = function (gulp, plugins, mode) {
    return htmlTasks(gulp, plugins, mode);
}