// - Plugins
import gulp from 'gulp'
import pug from 'gulp-pug'
import gulpSass from 'gulp-sass'
import prefix from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'
import sourcemaps from 'gulp-sourcemaps'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import changed from 'gulp-changed'
import watch from 'gulp-watch'
import * as dartSass from 'sass'
const sass = gulpSass(dartSass)



// - Paths
const pugTree = {
    root: './src/pug/**/*.pug',
    pages: './src/pug/pages/*.pug',
}
const scssPath = './src/scss/**/*.scss'
const jsPath = './src/js/**/*.js'
const imgPath = './src/img/**/*'
const jsHTMLFn = ["c", "d", "openURL"]
const primJSFile =  './src/js/tools.js'
const watchOptions = {readDelay: 0, ignoreInitial: false}



// - Build — HTML
gulp.task('html', async _ => {
    return gulp
        .src(pugTree.pages)
        .pipe(plumber({
            errorHandler: function (err) {
                console.error('Error in HTML task:', err.message)
                this.emit('end') // _ Prevent Gulp from crashing
            }
        }))
        .pipe(pug())
        .pipe(gulp.dest('./dist'))
})



// - Build — CSS
gulp.task('css', async _ => {
    return gulp
        .src(scssPath)
        .pipe(plumber({
            errorHandler: function (err) {
                console.error('Error in CSS task:', err.message)
                console.error('File:', err.filename)
                console.error('Line:', err.line)
                this.emit('end')
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'))
})



// - Build — JS
gulp.task('js', async _ => {
    return gulp
        .src([
            primJSFile,
            jsPath
        ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.error('Error in JS task:', err.message)
                console.error('File:', err.filename)
                console.error('Line:', err.line)
                this.emit('end')
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(terser({
            mangle: {
                toplevel: true,
                reserved: jsHTMLFn
            }
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'))
})



// - Assets - Images Minify
gulp.task('imgmin', async () => {
    return gulp
        .src(imgPath, { encoding: false })
        .pipe(changed('dist/assets'))
        .pipe(imagemin())  // _ Extra optimization before webp()
        .pipe(webp())
        .pipe(gulp.dest('dist/assets'))
})



// - Watchers
gulp.task('watch', () => {
    watch(pugTree.root, watchOptions, gulp.series('html'))
    watch(scssPath, watchOptions, gulp.series('css'))
    watch(jsPath, watchOptions, gulp.series('js'))
    watch(imgPath, watchOptions, gulp.series('imgmin'))
})



// - Default
gulp.task('default', gulp.series('watch'))