let project_folder = "dist";
let source_folder = "#source";


let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},

	src: {
		html: source_folder + "/*.html",
		css: source_folder + "/scss/style.scss",
		js: source_folder + "/js/main.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},

	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},

	clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	gulpStylelint = require('gulp-stylelint');
	// imagemin = require("gulp-imagemin"),
	// webp = require("gulp-webp"),
	// webpHtml = require("gulp-webp-html");

function browserSync(params) {
	browsersync.init({
		server:{
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
	.pipe(fileinclude())
	// .pipe(webpHtml())
	.pipe(dest(path.build.html))
	.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
	.pipe(
		scss({
			outputStyle: "expanded"
		})
	)
	.pipe(
		autoprefixer({
			overrideBrowserslist: ["last 5 version"],
			cascade: true
		})
	)
	.pipe(dest(path.build.css))
	.pipe(browsersync.stream())
}


// LINT CSS*************************************************
function lintCss() {
	return src(path.src.css)
	.pipe(gulpStylelint({
		failAfterError: false,
		reporters: [
		{formatter: 'string', console: true}
		]
	}))
	// .pipe(dest(path.build.css))
	.pipe(browsersync.stream())
}


// JS*************************************************
function js() {
	return src(path.src.js)
	
	.pipe(dest(path.build.js))
	.pipe(browsersync.stream())
}


// images*************************************************
function images() {
	return src(path.src.img)
	// .pipe(
	// 	webp({
	// 		quality: 70
	// 	})
	// )
	.pipe(dest(path.build.img))
	.pipe(src(path.src.img))
	// .pipe(
	// 	imagemin({
	// 		progressive: true,
	// 		svgopPlugins: [{ removeViewBox: false }],
	// 		interlaced: true,
	// 		optimizationLevel: 0
	// 	})
	// )
	.pipe(dest(path.build.img))
	.pipe(browsersync.stream())
}


function watchFiles() {
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.css], lintCss);
	gulp.watch([path.watch.js], js);
}

let build = gulp.series(gulp.parallel(css, html, js, images, lintCss));
let watch = gulp.parallel(build, watchFiles, browserSync, lintCss);


exports.lintCss = lintCss;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


// const gulp = require('gulp');
 
// gulp.task('lint-css', function lintCssTask() {
 
 
//   return gulp
//     .src('src/**/*.css')
//     .pipe(gulpStylelint({
//       reporters: [
//         {formatter: 'string', console: true}
//       ]
//     }));
// });