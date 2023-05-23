import gulp from 'gulp';
import plumber from 'gulp-plumber';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import cssLint from 'gulp-csslint';
import prefixer from 'gulp-autoprefixer';

import pug from 'gulp-pug';

import browsersync from 'browser-sync';

const pugTask = () => {
    return gulp.src(['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'])
        .pipe(plumber())
        .pipe(pug({
            pretty: ' ',
            basedir: './src/pug'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browsersync.reload({ stream: true }))
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
        .pipe(browsersync.reload({ stream: true }))
}

const serverTask = () => {
    browsersync({
        server: {
            baseDir: './dist',
            index: 'index.html',
            directory: true
        },
        startPath: '/index.html'
    })
}

const watchTask = () => {
    gulp.watch('./src/scss/**/*.scss', sassTask);
    gulp.watch('./src/pug/**/*.pug', pugTask);
}

export default gulp.parallel(watchTask, serverTask);