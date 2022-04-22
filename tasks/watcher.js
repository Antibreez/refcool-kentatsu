const gulp = require("gulp");

const requireDir = require("require-dir");
const task = requireDir("./");

const reload = task.server.reload;

module.exports = function watcher() {
  gulp.watch("source/scss/**/*.scss", gulp.series('styles'));
  gulp.watch("source/js/**/*.js", gulp.series('scripts', reload));
  gulp.watch("source/*.html", gulp.series('html', reload));
  gulp.watch(
    [
      "source/img/**/*.+(png|jpg|jpeg|gif|svg|ico)",
      "!source/img/icons/*.svg"
    ],
    gulp.series('webp', 'rastr', reload)
  );
  gulp.watch("source/img/icons/*.svg", gulp.series('sprite', reload));
}
