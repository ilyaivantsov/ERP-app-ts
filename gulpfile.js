var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var nodemon = require('gulp-nodemon');

gulp.task("server", function () {
    nodemon({
        script: 'src/build/index.js'
      , ext: 'js html'
      , env: { 'NODE_ENV': 'development' }
      })
});

gulp.task("default",['server'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("src/build"));
});

var watcher = gulp.watch('src/**/*.ts', ['default']);

watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});