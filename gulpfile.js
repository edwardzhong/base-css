const { src, dest, watch, series } = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const name = 'base'; //生成文件名称
sass.compiler = require('node-sass');

function clean(cb) {
  return del(['./dist', './css'], cb);
}

function scss() {
  return src('./scss/index.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) //outputStyle: expanded,compact,compressed
    .pipe(postcss())
    .pipe(rename(name + '.css'))
    .pipe(dest('css')) //输出未压缩的css
    .pipe(cleanCSS({ compatibility: 'ie8' })) //压缩代码，兼容浏览器，优化代码
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'));
}

function custom() {
  return src('./scss/custom.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) 
    .pipe(dest('css'));
}

// series   从左至右依次串行执行任务
// parallel 并行执行任务
watch('./scss/**/*.scss', scss);
exports.default = series(clean, scss);
exports.custom = custom;
