const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const autoPrefixer = require("gulp-autoprefixer");
const sourceMaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
function scss() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(
      autoPrefixer().on("error", (error) => {
        console.log("error", error);
      })
    )
    .pipe(gulp.dest("src/css/"))
    .pipe(browserSync.reload({ stream: true }));
}

function pugFiles() {
  return gulp
    .src("src/pug/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("src"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp.watch("src/scss/*.scss", scss);
  gulp.watch("src/pug/*.pug", pugFiles);
  gulp.watch("src/index.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
}

exports.scss = scss;
exports.pugFiles = pugFiles;
exports.watch = watch;
