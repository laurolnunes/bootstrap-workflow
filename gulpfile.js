var gulp = require("gulp");

var sass = require('gulp-sass');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

// Variáveis para reutilização
var scssFiles = './source/scss/*.scss',
    htmlFiles = './source/*.html'
    cssDest   = './dist/css';
    htmlDest  = './dist'

// Compilar e mover os arquivos css para /dist/css
gulp.task('compile-and-move-css', function(){
    return gulp.src(scssFiles)
    .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
	.pipe(concat('style.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())    
    .pipe(gulp.dest(cssDest));
});

// Minificar e mover arquivos HTML para /dist 
gulp.task('minify-html', function() {
    return gulp.src(htmlFiles)
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest(htmlDest));
  });

// Watcher para monitoramento dos arquivos dentro de /source/scss
gulp.task('background',function() {
    gulp.watch(scssFiles, 
        ['compile-and-move-css', 
        'minify-html']);
});