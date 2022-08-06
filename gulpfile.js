const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const ttfWoff2 = require('gulp-ttf2woff2');
const ttfWoff = require('gulp-ttf2woff');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();


const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
}

const font = () => {
    src('src/font/**.ttf')
      .pipe(ttfWoff())
      .pipe(dest('dist/fonts'))
    return src('src/font/**.ttf')
      .pipe(ttfWoff2())
      .pipe(dest('dist/fonts'))
      .pipe(browserSync.stream())
  }

const styles = () => {
    return src('src/style/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/image/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}

const images = () => {
    return src([
        'src/image/**/*.jpg',
        'src/image/**/*.png',
        'src/image/*.svg',
        'src/image/**/*.jpeg'
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


const browser = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const dev = () => {
    return src([
      'clean',
      'html: dev',
      'css: dev'
    ])
}
  
const build = () => {
    return src([
      'clean',
      'html: dev',
      'css: dev',
      'images',
      'scripts'
    ])
}

watch('src/**/*.html', htmlMinify);
watch('src/style/scss/**/*.scss', styles);
watch('src/image/svg/**/*.svg');
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/font/**.ttf', font);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.font = font;
exports.dev = dev;
exports.build = build;

exports.default = series(clean, resources, font, htmlMinify, scripts, styles, images, svgSprites, browser);