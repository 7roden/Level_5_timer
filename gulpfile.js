var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var paths = {
  pages: ["src/*.html"],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/timer.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .transform("babelify", {
        presets: ["es2015"],
        extensions: [".ts"],
      })
      .bundle()
      .pipe(source("bundleTimer.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist"));
  })
);
/*
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var moment = require('moment');
var paths = {
  pages: ["src/*.html"],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/timer.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundleTimer.js"))
      .pipe(gulp.dest("dist"));
  })
);
*/