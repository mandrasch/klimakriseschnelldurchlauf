"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
// does not support es6
//const uglify = require("gulp-uglify");
// replaced with:
const terser = require('gulp-terser');
const replace = require('gulp-replace');
const markdown = require('gulp-markdown');

const fs = require('fs');
const path = require('path');

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/StartBootstrap/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./build/"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/"]);
  return del(["./build/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./build/vendor/bootstrap'));
  // Font Awesome CSS
  var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(gulp.dest('./build/vendor/fontawesome-free/css'));
  // Font Awesome Webfonts
  var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(gulp.dest('./build/vendor/fontawesome-free/webfonts'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./build/vendor/jquery'));

  var scrollProgress = gulp.src('./node_modules/scrollprogress/dist/**/*')
    .pipe(gulp.dest('./build/vendor/scrollprogress'));
  // copy directories

  var markdownImages = gulp.src(['./markdown/img/**/*']).pipe(gulp.dest('./build/img'));
  var staticImages = gulp.src(['./src/static/**/*']).pipe(gulp.dest('./build/static'));
  var fonts = gulp.src(['./src/fonts/**/*']).pipe(gulp.dest('./build/fonts'));

  var htaccess = gulp.src(['./.htaccess']).pipe(gulp.dest('./build'));

  return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, scrollProgress, markdownImages, staticImages, fonts, htaccess);
}

// CSS task
function css() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./build/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./build/css"))
    .pipe(browsersync.stream());
}

// JS task
// 2DO: remove ignores?
function js() {
  return gulp
    .src([
      './src/js/*.js',
      '!./src/js/*.min.js',
      '!./src/js/contact_me.js',
      '!./src/js/jqBootstrapValidation.js'
    ])
    .pipe(terser())
    /*.pipe(header(banner, {
      pkg: pkg
    }))*/
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browsersync.stream());
}
// Markdown Task

// https://www.npmjs.com/package/gulp-markdown
// https://stackoverflow.com/a/35851097
function md2html(){
  var convert = gulp.src('./markdown/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('./build'))
        .pipe(browsersync.stream());
  return convert;
}

function injectMarkdownHtmlInIndex(){
  var replaceContent = gulp.src('./src/index.template.html')
    .pipe(replace('<!-- MARKDOWN-CONTENT -->', function() {
        // 2DO: use marked directly?
        // https://github.com/sindresorhus/gulp-markdown/blob/master/index.js
        //var renderedHtmlFromMarkdown = markdown(fs.readFileSync('./content/index.md','utf8'));
        //return renderedHtmlFromMarkdown;
        var htmlContent = fs.readFileSync('./build/index.content.html', 'utf8');
        return htmlContent;
      }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./build'))
      .pipe(browsersync.stream());

      return replaceContent;

      // 2DO: delete onepager.html afterwards
}



// Define complex tasks
const vendor = gulp.series(clean, modules);
const convertMarkdown = gulp.series(md2html,injectMarkdownHtmlInIndex); // need to run in order
const build = gulp.series(vendor, convertMarkdown, gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Watch files
function watchFiles() {
  gulp.watch("./src/scss/**/*", css);
  gulp.watch(["./src/js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./markdown/**/*.md", convertMarkdown);
  gulp.watch("./src/index.template.html", convertMarkdown);
  gulp.watch(["./src/static/**/*","./markdown/img/**/*"], modules);
}

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
