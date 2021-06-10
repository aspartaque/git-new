const { src, dest, watch } = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const livereload = require('gulp-livereload')
const beautify = require('gulp-beautify')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const minifyCSS = require('gulp-csso');
const browserify = require('browserify')
const vueify = require('vueify')
const source = require('vinyl-source-stream')
const express = require('express')
const app = express()

function compilePages () {
    return src('./src/pages/*.pug')
        .pipe(pug())
        .pipe(beautify.html({ editorconfig: true }))
        .pipe(dest('./public'))
        .pipe(livereload())
}

function compileStyles () {
    return src('./src/styles/main.sass')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename(function (path) {
            path.basename += '.min'
        }))
        .pipe(dest('./public/css'))
        .pipe(livereload())
}

function compileVue () {
    return browserify({ entries: ['./src/app.js'] })
        .transform(vueify)
        .require('vue/dist/vue.common', { expose: 'vue' })
        .bundle()
        .pipe(source('./app.js'))
        .pipe(dest('./public/js'))
        .pipe(livereload())
}

function startServer () {
    app.use(express.static('public'))

    app.listen(3000, function () {
        console.log('server is running')
    })
}

exports.reload = function () {
    livereload.listen()

    watch('./src/components/**/*.pug', compilePages)
    watch('./src/layouts/**/*.pug', compilePages)
    watch('./src/pages/*.pug', compilePages)

    watch('./src/components/**/*.sass', compileStyles)
    watch('./src/layouts/**/*.sass', compileStyles)
    watch('./src/pages/**/*.sass', compileStyles)
    watch('./src/styles/**/*.sass', compileStyles)

    watch(['./src/components/**/*.vue', './src/app.js'], compileVue)

    startServer()
}
