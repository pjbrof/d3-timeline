var gulp = require('gulp'),
    browsersync = require('browser-sync');

gulp.task('css', function () {
    return gulp.src('src/css/*css')
        .pipe(gulp.dest('src/css'));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/js/*js')
        .pipe(gulp.dest('src/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('watch', ['js','css'], function (done) {
    browsersync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js'], function () {

  // Serve files from the root of this project
  browsersync.init({
      server: {
          baseDir: "./"
      }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("src/js/*.js", ['watch']);
  gulp.watch("src/css/*.css", ['watch']);

});