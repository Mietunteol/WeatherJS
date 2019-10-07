const gulp = require('gulp');
const del = require('del');
const gulp_debug = require('gulp-debug');
const gulp_connect = require('gulp-connect');

const SOURCE = 'src';
const DESTINATION = 'build';

// region Task::clean
const clean = (cb) => {
    del.sync(`${DESTINATION}/**/*`);
    cb();
}; // endregion Task::clean

// region Task::html
const html = (cb) => {
    return gulp.src(`${SOURCE}/**/*.html`)
        .pipe(gulp.dest(DESTINATION))
        .pipe(gulp_debug())
        .pipe(gulp_connect.reload())
        .on('end', cb)
}; // endregion Task::html

// region Task::css
const css = (cb) => {
    return gulp.src(`${SOURCE}/**/*.css`)
        .pipe(gulp.dest(DESTINATION))
        .pipe(gulp_debug())
        .pipe(gulp_connect.reload())
        .on('end', cb)
}; // endregion Task::css

// region Task::js
const js = (cb) => {
    return gulp.src(`${SOURCE}/**/*.js`)
        .pipe(gulp.dest(DESTINATION))
        .pipe(gulp_debug())
        .pipe(gulp_connect.reload())
        .on('end', cb)
}; // endregion Task::js

// region Task::watch
const watch = (cb) => {
    gulp_connect.server({
        root: DESTINATION,
        livereload: true,
        hostname: '127.0.0.1',
        port: 65461,
    });
    gulp.watch(`${SOURCE}/**/*.html`, {delay: 500}, gulp.series(html));
    gulp.watch(`${SOURCE}/**/*.css`, {delay: 500}, gulp.series(css));
    gulp.watch(`${SOURCE}/**/*.js`, {delay: 500}, gulp.series(js));
    cb();
}; // endregion Task::watch

// region Task::build
const build = (cb) => {
    gulp.series(
        clean,
        gulp.parallel(html, css, js)
    )();

    return gulp.src(`${SOURCE}/**/*`)
        .pipe(gulp.dest(DESTINATION))
        .on('end', cb)
}; // endregion Task::build


exports.build = build;
exports.default = gulp.series(build, watch);
