/**
 * Toscani's Gulp 4 gulpfile template.
 *
 * Template last updated: 2019-01-11.
 * File last updated:     2020-06-08.
 */

/**
 * Directories.
 */
var dir = {
    php: 'app',
    input: {
        js:   'js',
        sass: 'sass',
    },
    output: {
        js:   'public_html/assets',
        sass: 'public_html/assets',
    },
};

/**
 * Packages.
 */
var gulp         = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var cleancss     = require( 'gulp-clean-css' );
var concat       = require( 'gulp-concat' );
var filter       = require( 'gulp-filter' );
var gulpif       = require( 'gulp-if' );
var livereload   = require( 'gulp-livereload' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var sass         = require( 'gulp-sass' );
var sassglob     = require( 'gulp-sass-glob' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var uglify       = require( 'gulp-uglify' );
var babel        = require( 'gulp-babel' );
var argv         = require( 'minimist' )( process.argv.slice( 2 ) );

/**
 * Environment.
 */
var env = ( argv.env ? argv.env : 'dev' );

/**
 * Config.
 */
var config = {
    run_sourcemaps:   ( env == 'dev' ? true : false ),
    run_minification: ( env == 'dev' ? false : true ),
};

/**
 * Feedback.
 */
console.log( '' );
console.log( 'Environment:  '+( env == 'dev' ? 'Development' : 'Production' ) );
console.log( '' );
console.log( 'Sourcemaps:   '+( config.run_sourcemaps ? 'Yes' : 'No' ) );
console.log( 'Minification: '+( config.run_minification ? 'Yes' : 'No' ) );
console.log( '' );

/**
 * Procedures.
 */
var app = [];

app.processJS = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: notify.onError( {
            title: args.name,
            message: '<%= error.type %> error on line <%= error.line %>\n\n<%= error.filename %>',
        } ) } ) )
        // start the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.init() ) )
        // compile
        .pipe( babel( { presets: ['@babel/env'] } ) )
        // concat the js
        .pipe( concat( args.outputFile ) )
        // minify the js
        .pipe( gulpif( config.run_minification, uglify() ) )
        // finish the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.write( '.' ) ) )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( gulpif( config.run_sourcemaps, filter( [ '**/*.js' ] ) ) )
        // reload the site
        .pipe( livereload() );
};

app.processSass = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: notify.onError( {
            title: 'Error in ' + args.name,
            message: '<%= error.messageOriginal %>\n\n<%= error.relativePath %>\n\nLine <%= error.line %>, column <%= error.column %>.',
        } ) } ) )
        // start the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.init() ) )
        // analyse the globs
        .pipe( sassglob() )
        // compile the sass to css
        .pipe( sass( { includePaths: ['node_modules'] } ) )
        // autoprefix the css
        .pipe( autoprefixer( 'last 10 versions' ) )
        // minify the css
        .pipe( gulpif( config.run_minification, cleancss( { keepSpecialComments: 0 } ) ) )
        // name the output file
        .pipe( rename( args.outputFile ) )
        // finish the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.write( '.' ) ) )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( gulpif( config.run_sourcemaps, filter( [ '**/*.css' ] ) ) )
        // reload the site
        .pipe( livereload() );
};

/**
 * Tasks: JS.
 */
gulp.task( 'js_theme', function ( done ) {
    app.processJS({
        'name'       : 'theme js',
        'inputFiles' : [ dir.input.js+'/theme.js' ],
        'outputDir'  : dir.output.js,
        'outputFile' : 'rt.min.js',
    });
    done();
});

/**
 * Tasks: Sass.
 */
gulp.task( 'sass_theme', function ( done ) {
    app.processSass({
        'name'       : 'theme sass',
        'inputFiles' : [ dir.input.sass+'/theme.scss' ],
        'outputDir'  : dir.output.sass,
        'outputFile' : 'rt.min.css',
    });
    done();
});

/**
 * Task: Livereload.
 */
gulp.task( 'livereload', function ( done ) {
    livereload.reload();
    done();
});

/**
 * Task: Watch.
 */
gulp.task( 'watch', function () {
    // start livereload
    livereload.listen();
    // JavaScript
    gulp.watch( dir.input.js+'/theme.js',   gulp.parallel( 'js_theme' ) );
    // Sass
    gulp.watch( dir.input.sass+'/**/*.scss',    gulp.parallel( 'sass_theme' ) );
    // PHP
    gulp.watch( dir.php+'/**/*.php', gulp.parallel( 'livereload' ) );
    // notify
    gulp.src( 'node_modules/gulp-notify/test/fixtures/1.txt' ).pipe( notify( 'Gulp is watching.' ) );
});

/**
 * Task: Default.
 */
gulp.task( 'default', gulp.parallel(
    'js_theme',
    'sass_theme',
));