const gulp = require("gulp");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const plumber = require("gulp-plumber");

module.exports = function rastr() {
	return gulp.src([
      "source/img/**/*.+(png|jpg|jpeg|gif|svg|ico)",
      "!source/img/icons/*.svg"
    ])
		.pipe(plumber())
		.pipe(changed("build/img"))
		.pipe(imagemin({
				interlaced: true,
				progressive: true,
				optimizationLevel: 4,
			},
			[
				recompress({
					loops: 6,
					min: 50,
					max: 90,
					quality: "high",
					use: [pngquant({
						quality: [0.8, 1],
						strip: true,
						speed: 1
					})],
				}),
				imagemin.gifsicle(),
				imagemin.optipng(),
				imagemin.svgo()
			], ), )
		.pipe(gulp.dest("build/img"))
}
