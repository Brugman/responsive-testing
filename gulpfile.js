/**
 * Toscani's Gulp 4 gulpfile template.
 *
 * Template last updated: 2020-12-24.
 * File last updated:     2021-05-01.
 */

/**
 * Directories.
 */
var dir = {
    php: 'app',
    input: {
        js:   'js',
        less: 'less',
    },
    output: {
        js:   'public_html/assets',
        less: 'public_html/assets',
    },
};

/**
 * Packages.
 */
var gulp         = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var cleancss     = require( 'gulp-clean-css' );
var filter       = require( 'gulp-filter' );
var gulpif       = require( 'gulp-if' );
var livereload   = require( 'gulp-livereload' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var argv         = require( 'minimist' )( process.argv.slice( 2 ) );
// js
var concat       = require( 'gulp-concat' );
var uglify       = require( 'gulp-uglify' );
var babel        = require( 'gulp-babel' );
// less
var less         = require( 'gulp-less' );

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
 * Plumber notification.
 */
var onError = function ( error ) {

    notify.onError({
        title: "Error in "+error.filename.replace( /^.*[\\\/]/, '' )+" on line "+error.line,
        message: "-\n"+error.extract,
        appID: "Gulp",
    })( error );

    this.emit('end');
};

/**
 * Procedures.
 */
var app = [];

app.processJS = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: onError } ) )
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
        // notify
        .pipe( notify({
            title: "Processed",
            message: args.name,
            appID: "Gulp",
        }))
        // reload the site
        .pipe( livereload() );
};

app.processLess = function ( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: onError } ) )
        // start the sourcemap
        .pipe( gulpif( config.run_sourcemaps, sourcemaps.init() ) )
        // compile the less to css
        .pipe( less() )
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
        // notify
        .pipe( notify({
            title: "Processed",
            message: args.name,
            appID: "Gulp",
        }))
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
 * Tasks: Less.
 */
gulp.task( 'less_theme', function ( done ) {
    app.processLess({
        'name'       : 'theme less',
        'inputFiles' : [ dir.input.less+'/theme.less' ],
        'outputDir'  : dir.output.less,
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
    gulp.watch( dir.input.js+'/theme.js', gulp.parallel( 'js_theme' ) );
    // Less
    gulp.watch( dir.input.less+'/**/*.less', gulp.parallel( 'less_theme' ) );
    // PHP
    gulp.watch( dir.php+'/**/*.php', gulp.parallel( 'livereload' ) );
    // notify
    gulp.src( 'node_modules/gulp-notify/test/fixtures/1.txt' ).pipe( notify({
        title: "Gulp watch is ready.",
        message: " ",
        appID: "Gulp",
    }));
});

/**
 * Task: Default.
 */
gulp.task( 'default', gulp.parallel(
    'js_theme',
    'less_theme',
));

