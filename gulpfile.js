var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var injectCSS = require('gulp-inject-css');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');

gulp.task('copy', function() {
    return gulp.src(['src/**/*', '!src/*.css', '!src/*.scss', '!src/scss/**/*', '!src/js/**/*', '!src/*.js', '!src/*.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('img', function() {
    return gulp.src('dist/img/*')
        .pipe(imagemin([
            imagemin.gifsicle(),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('inline', function() {
    return gulp.src('src/*.html')
        .pipe(injectCSS())
        .pipe(inlinesource())
        .pipe(replace('<link rel="stylesheet" href="app.css">', ''))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('src/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('cssmin', function() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });

    gulp.watch('src/*.scss', ['styles']);
    gulp.watch(['src/**/*.html', 'src/img/*', 'src/**/*.js']).on('change', browserSync.reload);

});

gulp.task('default', ['styles', 'serve']);

gulp.task('dist', function() {
    runSequence('clean', 'styles', 'cssmin', 'inline', 'copy', 'img');
}); 
