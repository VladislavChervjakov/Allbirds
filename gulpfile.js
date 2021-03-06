const {src, dest, series, watch} = require('gulp')
const sass = require( 'gulp-sass' )
const csso = require( 'gulp-csso' )
const htmlmin = require( 'gulp-htmlmin' )
const sync = require( 'browser-sync' ).create()
const del = require( 'del' )
const autoprefixer = require( 'gulp-autoprefixer' )
const concat = require( 'gulp-concat' )
const image = require( 'gulp-image' )
const shell = require( 'gulp-shell' )
const minify = require( 'gulp-minify' )

function start() {
    return src( '*.js', {read: false} )
    .pipe( shell( [
      'mkdir -p  src src/img src/scss src/js'
    ] ) )
}

function html() {
    return src( 'src/**.html' )
        .pipe( htmlmin({
            collapseWhitespace: true
        }) )
        .pipe( dest( 'dist' ) )

}

function scss() {
    return src( 'src/scss/**.scss' )
        .pipe( sass() )
        .pipe( autoprefixer( {
            overrideBrowserslist: ['last 2 versions']
        } ) )
        .pipe( csso() )
        .pipe( concat( 'main.css' ) )
        .pipe( dest('dist/css') )
}

function js() {
    return src( 'src/js/*.js' )
        .pipe( minify( {
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js']
        } ) )
        .pipe( dest( 'dist/js' ) )
}

function img() {
    return src( 'src/img/*' )
            .pipe( image() )
            .pipe( dest('dist/img') )
}

function clear() {
    return del( 'dist' );
}

function serve() {
    sync.init( {
        server: './dist'
    } )

    watch( 'src/**.html', series( html ) ).on( 'change', sync.reload )
    watch( 'src/scss/**.scss', series( scss ) ).on( 'change', sync.reload )
    watch( 'src/js/**.js', series( js ) ).on( ['add', 'change'], sync.reload )
    watch( 'src/img/*', series( img ) ).on( ['add', 'change'], sync.reload )
}


exports.start = start
exports.build = series(  clear, scss, js, html, img )
exports.serve = series ( clear, scss, js, html, img, serve )
exports.clear = clear
