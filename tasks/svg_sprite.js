const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");

module.exports = function sprite() {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}
