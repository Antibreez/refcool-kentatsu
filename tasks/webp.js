const gulp = require("gulp");
const changed = require("gulp-changed");
const gulpWebp = require("gulp-webp");
const plumber = require("gulp-plumber");

module.exports = function webp() {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(plumber())
    .pipe(changed("build/img"))
    .pipe(gulpWebp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}
