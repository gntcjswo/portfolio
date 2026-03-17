const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const obfuscator = require('gulp-javascript-obfuscator');
const replace = require('gulp-replace');
const del = require('del');

// 경로 설정
const paths = {
  html: {
    src: [
      '*.html',
      'portfolio/**/*.html',
      '!old/**',
      '!skill/**',
      '!node_modules/**'
    ],
    dest: 'deploy'
  },
  css: {
    src: [
      'assets/css/**/*.css',
      '!assets/css/**/*.min.css'
    ],
    dest: 'deploy/assets/css'
  },
  cssMin: {
    src: 'assets/css/**/*.min.css',
    dest: 'deploy/assets/css'
  },
  js: {
    src: [
      'assets/js/**/*.js',
      '!assets/js/lib/**',
      '!assets/js/html5shiv.js',
      '!assets/js/IE9.js',
      '!assets/js/ie11CustomProperties.min.js'
    ],
    dest: 'deploy/assets/js'
  },
  jsLib: {
    src: [
      'assets/js/lib/**/*',
      'assets/js/html5shiv.js',
      'assets/js/IE9.js',
      'assets/js/ie11CustomProperties.min.js'
    ],
    dest: 'deploy/assets/js'
  },
  assets: {
    src: [
      'assets/**/*',
      '!assets/css/**',
      '!assets/js/**',
      '!assets/scss/**'
    ],
    dest: 'deploy/assets'
  },
  robots: {
    src: 'robots.txt',
    dest: 'deploy'
  },
  favicon: {
    src: ['favicon.ico', 'og_logo.jpg'],
    dest: 'deploy'
  }
};

// clean - deploy 폴더 삭제
function clean() {
  return del(['deploy']);
}

// HTML 처리 - minify + robots meta 태그 추가
function html() {
  return gulp.src(paths.html.src, { base: '.' })
    .pipe(replace(
      /<meta charset="UTF-8">/i,
      '<meta charset="UTF-8">\n  <meta name="robots" content="noindex, nofollow">'
    ))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest(paths.html.dest));
}

// CSS 처리 - 일반 CSS minify
function css() {
  return gulp.src(paths.css.src, { base: 'assets/css' })
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest));
}

// CSS min 파일 복사
function cssMin() {
  return gulp.src(paths.cssMin.src, { base: 'assets/css' })
    .pipe(gulp.dest(paths.cssMin.dest));
}

// JS 처리 - 난독화 + minify
function js() {
  return gulp.src(paths.js.src, { base: 'assets/js' })
    .pipe(obfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayEncoding: [],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: 'variable',
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    }))
    .pipe(terser())
    .pipe(gulp.dest(paths.js.dest));
}

// JS lib 및 제외 파일 복사
function jsLib() {
  return gulp.src(paths.jsLib.src, { base: 'assets/js', encoding: false })
    .pipe(gulp.dest(paths.jsLib.dest));
}

// 기타 assets 복사 (이미지, 폰트 등)
function assets() {
  return gulp.src(paths.assets.src, { base: 'assets', encoding: false })
    .pipe(gulp.dest(paths.assets.dest));
}

// robots.txt 복사
function robots() {
  return gulp.src(paths.robots.src)
    .pipe(gulp.dest(paths.robots.dest));
}

// favicon 복사
function favicon() {
  return gulp.src(paths.favicon.src, { encoding: false })
    .pipe(gulp.dest(paths.favicon.dest));
}

// 빌드 태스크
const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    css,
    cssMin,
    js,
    jsLib,
    assets,
    robots,
    favicon
  )
);

// 기본 태스크
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.default = build;
