const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglifyJs = require('gulp-uglify');
const concatJs = require('gulp-concat');
const babel = require('gulp-babel');

const paths = {
  src: {
    styles: {
      app: 'src/scss/style.scss',
      appAll: 'src/scss/**/*.scss',
      libs: [
        './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
        './node_modules/swiper/dist/css/swiper.min.css'
      ]
    },
    scripts: {
      appAll: [
        './src/js/main.js'
      ],
      libs: [
        // './node_modules/element-closest/element-closest.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
        './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
        './node_modules/swiper/dist/js/swiper.jquery.js',
        // './src/js/libs/detect.js'
      ]
    }
  },
  web: {
    styles: {
      app: {
        file: 'style.css',
        dir: 'web/css'
      },
      libs: {
        file: 'libs.css',
        dir: './web/css'
      }
    },
    scripts: {
      app: {
        file: 'main.js',
        dir: './web/js'
      },
      libs: {
        file: 'libs.js',
        dir: './web/js/libs'
      }
    }
  }
};

gulp.task('scss', function () {
  return gulp.src(paths.src.styles.app)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer('last 5 versions', '> 1%', 'ie 9'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.web.styles.app.dir))
});

gulp.task('libsCss', function () {
  return gulp.src(paths.src.styles.libs)
    .pipe(concatCss(paths.web.styles.libs.file))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.web.styles.libs.dir));
});

gulp.task('libsJs', function () {
  return gulp.src(paths.src.scripts.libs)
    .pipe(concatJs(paths.web.scripts.libs.file))
    .pipe(uglifyJs().on('error', notify.onError()))
    .pipe(gulp.dest(paths.web.scripts.libs.dir));
});

gulp.task('js', function () {
  return gulp.src(paths.src.scripts.appAll)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['env'] }).on('error', notify.onError()))
    .pipe(concatJs(paths.web.scripts.app.file))
    .pipe(uglifyJs().on('error', notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.web.scripts.app.dir))
    .pipe(notify('Done!'));
});

gulp.task('watch', function () {
  gulp.watch([paths.src.styles.libs], ['libsCss']);
  gulp.watch([paths.src.styles.appAll], ['scss']);
  // gulp.watch([paths.src.scripts.libs], ['libsJs']  );
  gulp.watch([paths.src.scripts.appAll], ['js']);
});

gulp.task('default', [
  'scss',
  'libsCss',
  'libsJs',
  'js',
  'watch'
]);