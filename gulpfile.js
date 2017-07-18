const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

//babel compile es6
gulp.task('compile', function () {
  return gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['compile'], function(done) {
  browserSync.reload();
  done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('server', ['compile'], function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch('js/**/*.js', ['js-watch']);
  gulp.watch('*.html').on('change', browserSync.reload);
});