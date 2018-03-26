const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const $ = require('gulp-load-plugins')();
const Builder = require('systemjs-builder');

const bundleConfig = {
    baseURL: config.PATHS.dist.cjs,
    defaultJSExtensions: true,
    packageConfigPaths: [
        path.join('.', 'node_modules', '*', 'package.json'),
        path.join('.', 'node_modules', '@angular', '*', 'package.json')
    ],
    paths: {
        'npm:': './node_modules/',
        'ng2-adal/*': '*',
        '@angular/*': './node_modules/@angular/*',
        'adal-angular': './node_modules/adal-angular/lib/adal.js',
        '*': './node_modules/*'
    },
    map: {
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        'tslib': 'npm:tslib',
        'rxjs': 'npm:rxjs'
    },
    packages: {

        'rxjs': {
            main: 'Rx.js',
            defaultExtension: 'js'
        },
        'tslib': {
            main: 'tslib.js',
            defaultExtension: 'js'
        }
    }
};

function bundle(moduleName, moduleBundleName, minify, done) {
    const outputConfig = {
        sourceMaps: true,
        minify
    };
    const builder = new Builder(bundleConfig);
    const outputFile =
        path.join(config.PATHS.dist.bundles, `${moduleBundleName}${(minify ? '.min' : '')}.js`);
    const bundlePromise =
        builder.bundle(`${moduleName}`, outputFile, outputConfig);
    return bundlePromise.then(() => {
        done();
    });
}

gulp.task('bundle:cjs', ['scripts:cjs'], (done) => {
    bundle('ng2-adal/core', 'ng2-adal', false, done);
});

gulp.task('bundle:cjs:min', ['scripts:cjs'], (done) => {
    bundle('ng2-adal/core', 'ng2-adal', true, done);
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs:min']);