const { src, dest, watch, series } = require('gulp');
const del = require('del');
const concatCss = require('gulp-concat-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const name = 'base';//生成文件名称
sass.compiler = require('node-sass');

function clean(cb) {
    return del(['./dist', './css'], cb);
}

function parseLess() {
    return src('./less/index.less')
        .pipe(less())
        .pipe(dest('./css'));
}

function parseScss() {
    return src('./scss/index.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))//outputStyle: expanded,compact,compressed
        .pipe(dest('./css'));
}

function css() {
    return src(['css/index.css'])
        .pipe(postcss([
            autoprefixer({
                browsers: ["last 2 version", "> 5%", "Firefox >= 20", "not ie <= 8"]//["last 2 version", "> .5%","ie 6-8"]
            })
        ]))
        .pipe(rename(name + '.css'))
        .pipe(dest('./dist'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))//压缩代码，兼容浏览器，优化代码
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist'));
}
// series   从左至右依次串行执行任务
// parallel 并行执行任务
// watch('./less/**/*.less', series(parseLess, css));
watch('./scss/**/*.scss', series(parseScss, css));
exports.default = series(clean, parseScss, css);
