import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpPlumber from 'gulp-plumber';
import gulpAutoPrefixer from 'gulp-autoprefixer';
import gulpPrefixer from 'gulp-autoprefixer';
import cssLint from 'gulp-csslint';
const sass = gulpSass(dartSass);

const sassTask = () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(gulpPlumber())
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe(cssLint())
        .pipe(gulpPrefixer())
        .pipe(gulp.dest('./dist/css'));
}

export function sassW() {
    gulp.watch('./src/scss/style.scss', sassTask);
} 