var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
 
gulp.task('watch', function () {
    return watch(['./less/**/*.less'], function (){
        gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
    });
});

gulp.task('clean', function(cb) {
    return del(['./dist','./css'], cb);
});

gulp.task('less', function () {
    return  gulp.src('./less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

gulp.task('css',['less'],function() {
    return gulp.src(['css/index.css'])
        .pipe(postcss([ autoprefixer({
                "browsers": ["last 2 version", "> 0.5%", "ie 6-8","Firefox < 20"]
                // "browsers": ["last 2 version", "> 0.1%"]
            })
        ]))
        .pipe(rename('pure.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(cleanCSS())//代替 gulp-minify-css
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

// gulp.task('css', function() {
//     return gulp.src(['css/normalize.css','css/index.css'])
//         .pipe(concatCss("pure.css"))
//         .pipe(postcss([ autoprefixer()]))
//         .pipe(gulp.dest('./dist'))
//         .pipe(cleanCSS())//代替 gulp-minify-css
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('./dist'));
// });

gulp.task("default", ['css']);
