const requireDir = require("require-dir");
const gulp = require("gulp");

const task = requireDir("./tasks");
const watcher = task.watcher;
exports.server = task.server;
exports.clean = task.clean;
exports.copy = task.copy;
exports.styles = task.styles;
exports.html = task.html;
exports.scripts = task.scripts;
exports.rastr = task.rastr;
exports.webp = task.webp;
exports.sprite = task.svg_sprite;

// Build

const build = gulp.series(
  exports.clean,
  exports.copy,
  exports.webp,
  gulp.parallel(
    exports.styles,
    exports.html,
    exports.scripts,
    exports.rastr,
    exports.sprite
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  exports.clean,
  exports.copy,
  exports.webp,
  gulp.parallel(
    exports.styles,
    exports.html,
    exports.scripts,
    exports.rastr,
    exports.sprite
  ),
  gulp.series(
    exports.server.init,
    watcher
  ));
