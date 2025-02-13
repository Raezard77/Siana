//-- Plugins
import gulp from 'gulp'
import pug from 'gulp-pug'
import gulpSass from 'gulp-sass'
import prefix from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'
// import sourcemaps from 'gulp-sourcemaps'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import changed from 'gulp-changed'
import watch from 'gulp-watch'
import rename from 'gulp-rename'
import * as dartSass from 'sass'
const sass = gulpSass(dartSass)



//-- Paths
const pugTree = {
    root: './src/pug/**/*.pug',
    pages: './src/pug/pages/*.pug',
}
const scssPath = './src/scss/**/*.scss'
const jsPath = './src/js/**/*.js'
const imgPath = './src/img/**/*'
const jsHTMLCn = ["c", "d", "openURL", "prevQuote", "nextQuote", "goToQuote", "textSlider"]
const primJSFile =  [
    './src/js/boilerplate/tools.js',
    './src/js/boilerplate/data.js'
]
const watchOptions = {readDelay: 0, ignoreInitial: false}



//-- Custom
const brands = ['lg', 'ua', 'toshiba']



//-- Build — HTML
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
        .pipe(gulp.dest('./dist/stager'))
})



//-- Build — CSS
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
        // .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(cleanCSS())
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/stager'))
})



//-- Build — JS
gulp.task('js', async _ => {
    return gulp
        .src([
            ...primJSFile,
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
        // .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(terser({
            mangle: {
                toplevel: true,
                reserved: jsHTMLCn
            }
        }))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/stager'))
})



//-- Assets - Images Minify
gulp.task('imgmin', async () => {
    return gulp
        .src(imgPath, { encoding: false })
        .pipe(changed('dist/assets'))
        .pipe(imagemin())  // _ Extra optimization before webp()
        .pipe(webp())
        .pipe(gulp.dest('dist/assets'))
})



//-- Variants
const createVariantTask = (brand, ext, file, js = false) => () => {
    const label = js ? file : brand
    gulp.src(`dist/stager/${label}.${ext}`)
        .pipe(rename(`${file}.${ext}`))
        .pipe(gulp.dest(`dist/variants/${brand}`));
}
brands.forEach(brand => gulp.task(`${brand}-html`, createVariantTask(brand, 'html', 'index')))
brands.forEach(brand => gulp.task(`${brand}-css`, createVariantTask(brand, 'css', 'styles')))
brands.forEach(brand => gulp.task(`${brand}-js`, createVariantTask(brand, 'js', 'scripts', true)))



//-- Watchers
gulp.task('watch', () => {
    watch(pugTree.root, watchOptions, gulp.series('html'))
    watch(scssPath, watchOptions, gulp.series('css'))
    watch(jsPath, watchOptions, gulp.series('js'))
    watch(imgPath, watchOptions, gulp.series('imgmin'))
    brands.forEach(brand => {watch(`dist/stager/${brand}.html`, gulp.series(`${brand}-html`))})
    brands.forEach(brand => {watch(`dist/stager/${brand}.css`, gulp.series(`${brand}-css`))})
    brands.forEach(brand => {watch(`dist/stager/scripts.js`, gulp.series(`${brand}-js`))})
})



//-- Default
gulp.task('default', gulp.series('watch'))