import gulp from 'gulp';
import plumber from 'gulp-plumber';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import cssLint from 'gulp-csslint';
import prefixer from 'gulp-autoprefixer';

import pug from 'gulp-pug';

import browsersync from 'browser-sync';

import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const pugTask = () => {
    return gulp.src(['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'])
        .pipe(plumber())
        .pipe(pug({
            pretty: true,
            basedir: './src/pug'
        }))
        .pipe(gulp.dest('./dist'))
}

const sassTask = () => {
    return gulp.src(['./src/scss/**/*.scss', '!./src/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(
            sass.sync({
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(cssLint())
        .pipe(prefixer())
        .pipe(gulp.dest('./dist/css'))
}

const bundleJSTask = () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('./dist/js'));
}

const serverInit = () => {
    browsersync({
        server: {
            baseDir: './dist',
            index: 'index.html',
            directory: true
        },
        startPath: '/index.html',
        notify: false
    })
}

const reloadTask = (cb) => {
    browsersync.reload();
    cb();
}

const watchTask = () => {
    gulp.watch('./src/scss/**/*.scss', sassTask);
    gulp.watch('./src/pug/**/*.pug', pugTask);
    gulp.watch('./src/js/**/*.js', bundleJSTask);
    gulp.watch('./src/**/*', reloadTask);
}

export default gulp.parallel(watchTask, serverInit);